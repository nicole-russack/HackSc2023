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

// components
import Compass from './components/Compass'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config })

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://192.168.1.30:3000/?year=2023&month=2&day=3&hour=12&minute=31&planet=mars&lat=34.0522&lng=118.243', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(article => {
      setData(article)
    })
  
  }, [])
  
  return (
    <NativeBaseProvider>
      <Center style={{width: '50%', height: '50%', backgroundColor: 'white'}}>
        <Text>{data["alt degrees"]}</Text>
        <Text>{data["alt degrees"]}</Text>
        <Text>{data["distance"]}</Text>
      </Center>
    </NativeBaseProvider>
  )
}

export default App
