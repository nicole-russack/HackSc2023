from skyfield.api import load, wgs84, N,S,E,W,Star
from flask import Flask, jsonify, request
from skyfield.framelib import ecliptic_frame
from skyfield.data import hipparcos

def getDirection(year, month, day, hour, minute, planet, lat, lng):
  ts = load.timescale()
  t = ts.utc(year, month, day, hour+8, minute, 0)
  eph = load('de421.bsp')
  if planet == 'jupiter' or planet == 'neptune' or planet == 'saturn' or planet == 'uranus':
    planet += ' barycenter'
  earth, p = eph['earth'], eph[planet]
  earth = earth + wgs84.latlon(lat, lng)
  e = earth.at(t)
  v = e.observe(p)
  alt, az, distance = v.apparent().altaz()
  return [alt.degrees, az.degrees, distance.au]

def getMoonPhase(year, month, day, hour, minute):
  ts = load.timescale()
  t = ts.utc(year, month, day, hour+8, minute)

  eph = load('de421.bsp')
  sun, moon, earth = eph['sun'], eph['moon'], eph['earth']

  e = earth.at(t)
  s = e.observe(sun).apparent()
  m = e.observe(moon).apparent()

  _, slon, _ = s.frame_latlon(ecliptic_frame)
  _, mlon, _ = m.frame_latlon(ecliptic_frame)
  phase = (mlon.degrees - slon.degrees) % 360.0

  percent = 100.0 * m.fraction_illuminated(sun)

  return [phase, percent]

def getStarDirection(year, month, day, hour, minute, star, lat, lng):
  with load.open(hipparcos.URL) as f:
    df = hipparcos.load_dataframe(f)
  if star == 'barnards':
    star = Star.from_dataframe(df.loc[87937])
  elif star == 'betelgeuse':
    star = Star.from_dataframe(df.loc[27989])
  elif star == 'sirius':
    star = Star.from_dataframe(df.loc[32349])
  elif star == 'polaris':
    star = Star.from_dataframe(df.loc[11767])
  else:
    star = Star.from_dataframe(df.loc[87937])
  ts = load.timescale()
  t = ts.utc(year, month, day, hour+8, minute, 0)
  eph = load('de421.bsp')
  earth, p = eph['earth'], star
  earth = earth + wgs84.latlon(lat, lng)
  e = earth.at(t)
  v = e.observe(p)
  alt, az, distance = v.apparent().altaz()
  return [alt.degrees, az.degrees, distance.au]
#print(getStarDirection(2023, 2, 5, 3, 30, 'betelgeuse', -42.3583, 71.0603))
#print(getMoonPhase(2023, 2, 5, 3, 30))


app = Flask(__name__)

@app.route('/', methods = ["GET"])
def get_articles():
  year = request.args.get('year')
  month = request.args.get('month')
  day = request.args.get('day')
  hour = request.args.get('hour')
  minute = request.args.get('minute')
  planet = request.args.get('planet')
  lat = request.args.get('lat')
  lng = request.args.get('lng')

  print(request.args)
  print("year: " + year)

  data = getDirection(int(year), int(month), int(day), int(hour), int(minute), planet, float(lat), float(lng))
  print(data)
  return jsonify({"altitude":data[0],
                  "azimuth":data[1],
                  "distance":data[2]})

if __name__ == "__main__":
  app.run(host = '192.168.1.30', port = 3000, debug=True)
