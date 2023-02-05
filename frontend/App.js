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



// components
import Compass from './components/Compass'
import Pointer from "./components/Pointer"

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

  useEffect(() => {
    fetch('http://192.168.1.36:3000/?year=2023&month=2&day=3&hour=12&minute=31&planet=mars&lat=34.0522&lng=118.243', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(article => {
      console.log(article)
      setAzimuth(article.azimuth);
      setAltitude(article.altitude);
    })
  }, [])

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
  

    
  return (
    <NativeBaseProvider>      
      {/* <Text>{data.rotation.alpha}</Text> 
      <Text>{data.rotation.beta}</Text>
      <Text>{data.rotation.gamma}</Text> */}
      {/* <Text>{data}</Text> */}
      
      
      <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        {/* <Text style={{color: 'white', fontSize: '30pt', lineHeight: 100 }}>{heading}°</Text> */}
        <Pointer />
        <Text style = {{color:'white'}}> {data} </Text>
        <Compass azimuth={azimuth} />
      </Center>
    </NativeBaseProvider>
  )
}

export default App
