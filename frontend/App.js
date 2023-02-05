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

// components
import Compass from './components/Compass'
import Pointer from "./components/Pointer"
import Galaxy from "./components/Galaxy"

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
  const [heading, setHeading] = useState(0)

  useEffect(() => {
    fetch('http://unpaul.pythonanywhere.com/planet?year=2023&month=2&day=4&hour=20&minute=31&planet=moon&lat=34.0522&lng=-118.243', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(article => {
      console.log(article)
      setAzimuth(article.azimuth);
      setAltitude(article.altitude);
    })
  }, []);

  const handleHeadingChange = heading => {
    setHeading(heading);
  };

  return (
    <NativeBaseProvider>      
      <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        {/* <Text style={{color: 'white', fontSize: '30pt', lineHeight: 100 }}>{azimuth}°</Text> */}
        <Pointer />
        <Compass azimuth={azimuth} onHeadingChange={handleHeadingChange} />
        <Galaxy rotation={heading}/>
      </Center>
    </NativeBaseProvider>
  )
}

export default App
