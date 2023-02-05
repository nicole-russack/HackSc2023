import React, {useState, useEffect} from "react"
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  View,
  Box,
} from "native-base"
import NativeBaseIcon from "./components/NativeBaseIcon"
import { Platform } from "react-native"
import * as Location from "expo-location"
import { DeviceMotion } from 'expo-sensors'; 
import moment from 'moment';

// components
import Compass from './components/Compass'
import Pointer from "./components/Pointer"
import Galaxy from "./components/Galaxy"
import Altimeter from "./components/Altimeter"

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config })

const App = () => {

  const [azimuth, setAzimuth] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [heading, setHeading] = useState(0);

  const [pitch, setPitch] = useState(0);
  var year = moment().utcOffset('-08:00').format('YYYY')
  var month = moment().utcOffset('-08:00').format('MM')
  var day = moment().utcOffset('-08:00').format('DD')
  var hour = moment().utcOffset('-08:00').format('HH') -8 
  var minute = moment().utcOffset('-08:00').format('mm')
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [url, setUrl] = useState(null);


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("this is the location" , location.coords.latitude);
      console.log("this is the location" , location.coords.longitude);
      console.log("this is the time ", year, " ", month, " ", day);
      const tempUrl = 'http://unpaul.pythonanywhere.com/planet?year=' + year + '&month=' + month + '&day=' + day + '&hour=' + hour + '&minute=' + minute + '&planet=moon&lat=' + location.coords.latitude + '&lng=' + location.coords.longitude;
      setUrl(tempUrl);
      
      fetch(tempUrl, {
        method:'GET'
      })
      .then(resp => resp.json())
      .then(article => {
        console.log(article)
        setAzimuth(article.azimuth);
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
//Call Once when Screen loads
useEffect(() => {
  //Subscribe Function
  _subscribe();
  //Call Once when Screen unloads
  return () => {
    _unsubscribe(); //Unsubscribe Function
  };
}, []);

//SetInterval between listening of 2 DeviceMotion Action
const _setInterval = () => {
  DeviceMotion.setUpdateInterval(77);
};

const _subscribe = () => {
  //Adding the Listener
  DeviceMotion.addListener((devicemotionData) => {
   
    setData(devicemotionData.rotation.beta * 180/3.14); 
  });
  //Calling setInterval Function after adding the listener
  _setInterval();
};

const _unsubscribe = () => {
  //Removing all the listeners at end of screen unload
  DeviceMotion.removeAllListeners();
};
  

  const handleHeadingChange = heading => {
    setHeading(heading);

  };

  const handlePitchChange = newPitch => {
    setPitch(newPitch);
  }

  return (
    <NativeBaseProvider>      
      
     
        {/* <Text style={{color: 'white', fontSize: '30pt', lineHeight: 100 }}>{azimuth}°</Text> */}

        {location &&
          <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
          <Pointer />
          <Text style = {{color:'white'}}> {data} </Text>
          <Compass azimuth={azimuth} onHeadingChange={handleHeadingChange} />
          <Galaxy rotation={heading}/>
     </Center>
      }
       

    </NativeBaseProvider>
  )
}

export default App
