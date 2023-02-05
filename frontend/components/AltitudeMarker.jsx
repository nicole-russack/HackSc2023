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
const AltitudeMarker = ({ height }) => {
  
  const screenHeight = Dimensions.get('screen').height;
  const bottom = (screenHeight / 2) + height * (screenHeight / 2);

  const styles = {
    position: 'absolute',
    bottom,
    width: 5000,
    height: 4,
    backgroundColor: 'white'
  }

  return (
    <Box style={styles}></Box>
  )
}

export default AltitudeMarker