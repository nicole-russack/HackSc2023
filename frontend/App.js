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
import { useState, useEffect } from "react"

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

  useEffect(() => {
    fetch('http://192.168.1.30:3000/?year=2023&month=2&day=3&hour=12&minute=31&planet=mars&lat=34.0522&lng=118.243', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(article => {
      setData(article)
    })
  
  }, [])
  

  const [azimuth, setAzimuth] = useState(45)
    
  return (
    <NativeBaseProvider>      
      <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        {/* <Text style={{color: 'white', fontSize: '30pt', lineHeight: 100 }}>{heading}°</Text> */}
        <Pointer />
        <Compass azimuth={azimuth} />
      </Center>
    </NativeBaseProvider>
  )
}

export default App
