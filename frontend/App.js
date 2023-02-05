import React, {useState, useEffect} from "react"
import {
  Text,
  Center,
  NativeBaseProvider,
  extendTheme,
  Box,
} from "native-base"
import * as Location from "expo-location"
import { DeviceMotion } from 'expo-sensors'; 
import moment from 'moment';

// components
import Compass from './components/Compass'
import Pointer from "./components/Pointer"
import Galaxy from "./components/Galaxy"
import Altimeter from "./components/Altimeter"
import CompassInfo from './components/CompassInfo'
import CompassContainer from "./components/CompassContainer";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config })

const App = () => {

  const [azimuth, setAzimuth] = useState(0);
  const [altitude, setAltitude] = useState(1);
  
  var year = moment().utcOffset('-08:00').format('YYYY')
  var month = moment().utcOffset('-08:00').format('MM')
  var day = moment().utcOffset('-08:00').format('DD')
  var hour = moment().utcOffset('-08:00').format('HH') 
  var minute = moment().utcOffset('-08:00').format('mm')
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [url, setUrl] = useState(null);

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  })

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low 
      });

      setLocation(location);
      const tempUrl = 'http://unpaul.pythonanywhere.com/planet?year=' + year + '&month=' + month + '&day=' + day + '&hour=' + hour + '&minute=' + minute + '&planet=moon&lat=' + location.coords.latitude + '&lng=' + location.coords.longitude;
      console.log(tempUrl);
      setUrl(tempUrl);
      
      fetch(tempUrl, {
        method:'GET'
      })
      .then(resp => resp.json())
      .then(article => {
        setAzimuth(article.azimuth);
        console.log(article.altitude);
        setAltitude(article.altitude);
      })

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [data, setData] = useState();

  // keep track of active ojbect
  const [activeObject, setActiveObject] = useState(null)
  
  // passed into CompassInfo
  const setActiveObjectCB = (object) => {
    setActiveObject(object)
  }

  // keep track of time data
  const [timeOffsetData, setTimeOffsetData] = useState({
    hours: 0,
    days: 0,
    months: 0,
    years: 0
  })

  // passed into CompassInfo
  const setTimeOffsetDataCB = (data) => {
    setTimeOffsetData(data)
  }

  return (
    <NativeBaseProvider>      

        {location ?
          <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
            <CompassInfo onActiveObjectChange={setActiveObjectCB} onTimeOffsetData={setTimeOffsetDataCB} />
            <CompassContainer azimuth={azimuth}/>
            <Altimeter targetPitch={altitude} />
          </Center> 
          :
          <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
            <Text style={{color:'white'}}>Loading....</Text>
          </Center> 
      }       

    </NativeBaseProvider>
  )
}

export default App