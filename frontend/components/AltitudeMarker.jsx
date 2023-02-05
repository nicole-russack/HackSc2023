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
const AltitudeMarker = ({ altitude }) => {
  
  const screenHeight = Dimensions.get('window').height;
  const size = altitude / 90 * 325;

  const styles = {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'white',
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