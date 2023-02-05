from skyfield.api import load, wgs84, N,S,E,W
from flask import Flask, jsonify, request

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


  data = getDirection(int(year), int(month), int(day), int(hour), int(minute), planet, float(lat), float(lng))
  print(data)
  return jsonify({"alt degrees":data[0],
                  "az degrees":data[1],
                  "distance":data[2]})

if __name__ == "__main__":
  app.run(host = '192.168.1.30', port = 3000, debug=True)
