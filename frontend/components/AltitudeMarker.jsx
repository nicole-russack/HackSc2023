import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    Circle,
    NativeBaseProvider,
    Text,
    View
} from 'native-base'
import { Dimensions } from 'react-native'

// the height prop is from -1 (bottom of screen) to 1 (the top)
const AltitudeMarker = ({ altitude, targetAltitude }) => {
  
  const screenHeight = Dimensions.get('window').height;
  const size = altitude / targetAltitude * 325;

  const styles = {
    position: 'absolute',
    backgroundColor: Math.round(altitude) === Math.round(targetAltitude) ? '#4ced2833' : '#ffffff33',
    borderWidth: 3,
    borderColor: Math.round(altitude) === Math.round(targetAltitude) ? '#4ced28' : 'white',
    width: 325,
    height: 325,
    borderRadius: 325,
    transform: [{translateY: 232}, {translateX: 1}, {scaleX: altitude / targetAltitude}, {scaleY: altitude / targetAltitude}]
  }

  return (
    <View style={styles}></View>
  )
}

export default AltitudeMarker