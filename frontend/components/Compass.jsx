import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
    Text,
} from 'native-base'
import * as Location from 'expo-location'

const Compass = ({ azimuth }) => {

    const [heading, setHeading] = useState(0);

    // sets up a subscription to listen for changes in the phone's compass heading
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
        <Box style={{transform: [{rotate: `${-heading + azimuth}deg`}, {translateY: -12}]}}>
            {/* <Text style={{color: 'white'}}>{x}</Text> */}
            {/* Compass Traingle Pointer */}
            <Center style={{marginBottom: 5}}>
                <Box style={{width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderBottomWidth: 20,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: "red",}} />
            </Center>

            {/* Compass Circle */}
            <Box style={{borderColor: 'gray', borderWidth: 5, borderStyle: 'dotted', borderRadius: 200, width: 325, height: 325}}>
            </Box>

        </Box>
    )
}

export default Compass