import React from "react"
import {
  Text,
  Center,
  NativeBaseProvider,
  extendTheme,
  Box,
} from "native-base"
import * as Location from "expo-location"
import { useState, useEffect } from "react"

// components
import Compass from './components/Compass'
import CompassInfo from './components/CompassInfo'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config })

const App = () => {

  const [activeObject, setActiveObject] = useState(null)
  const setActiveObjectCB = (object) => {
    setActiveObject(object)
  }

  // select object
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

      <Box style={{width: '100%', height: '100%', backgroundColor: 'black'}}>

        <Box style={{flexGrow: 1}} />

        {/* Compass Info */}
        <CompassInfo setActiveObject={setActiveObjectCB} />

        {/* Compass */}
        <Center>
          <Text style={{color: 'white', fontSize: '30pt', lineHeight: 100 }}>{heading}°</Text>
          <Compass rotation={-heading}/>
        </Center>

        <Box style={{flexGrow: 1}} />

      </Box>

    </NativeBaseProvider>
  )
}

export default App
