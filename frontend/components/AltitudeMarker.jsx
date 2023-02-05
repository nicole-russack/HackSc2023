import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    Circle,
    NativeBaseProvider,
    Text,
} from 'native-base'
import { Dimensions } from 'react-native'

// the height prop is from -1 (bottom of screen) to 1 (the top)
const AltitudeMarker = ({ altitude, targetAltitude }) => {
  
  const screenHeight = Dimensions.get('window').height;
  const size = altitude / targetAltitude * 325;

  const styles = {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: Math.round(altitude) === Math.round(targetAltitude) ? '#4ced28' : 'white',
    width: size,
    height: size,
    borderRadius: 325,
    transform: [{translateY: 82}]
  }

  return (
    <Box style={styles}></Box>
  )
}

export default AltitudeMarker