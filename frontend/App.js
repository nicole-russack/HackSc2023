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
  
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    (async () => {
      
      console.log('async function called.')
      
      // check if user has allowed us to use their location while app is in the foreground
      const permissions = await Location.getForegroundPermissionsAsync();
    
      console.log('permissions checked:', permissions)

      // user has not allowed us to use their location
      if(!permissions.granted) {
        console.log('Permissions not granted. Asking now...')
        const newPermissions = await Location.requestForegroundPermissionsAsync();

        if(!newPermissions.granted) {
          console.log('Permissions still denied! Returning...')
          return;
        }
      }
      
      // listen for changes in the phone's compass heading
      Location.watchHeadingAsync(data => {
        let { trueHeading } = data;
        trueHeading = Math.round(trueHeading);
        setHeading(trueHeading);
      })
      .catch(err => console.log(err));
    })()
  }, []);
  
  return (
    <NativeBaseProvider>
      {/* <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center">
          <NativeBaseIcon />
          <Heading size="lg">Welcome to NativeBase</Heading>
          <HStack space={2} alignItems="center">
            <Text>Edit</Text>
            <Box
              _web={{
                _text: {
                  fontFamily: "monospace",
                  fontSize: "sm",
                },
              }}
              px={2}
              py={1}
              _dark={{ bg: "blueGray.800" }}
              _light={{ bg: "blueGray.200" }}
            >
              App.js
            </Box>
            <Text>and save to reload.</Text>
          </HStack>
          <Link href="https://docs.nativebase.io" isExternal>
            <Text color="primary.500" underline fontSize={"xl"}>
              Learn NativeBase
            </Text>
          </Link>
        </VStack>
      </Center> */}
      
      <Center style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize: '30pt', lineHeight: 100 }}>{heading}°</Text>
        <Compass rotation={-heading}/>

      </Center>
    </NativeBaseProvider>
  )
}

export default App
