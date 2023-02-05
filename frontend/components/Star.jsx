import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    Circle,
    NativeBaseProvider,
    Text,
} from 'native-base'

const Star = ({ x, y }) => {
    
  const colors = [
    'FFFEFB',
    'FFFEFB',
    'DD9867',
    '889CBE',
    'E9E4DB',
    'D88F3A'
  ]

  const color = `#${colors[Math.floor(Math.random() * colors.length)]}`;
  
  const starStyles = {
    backgroundColor: color,
    shadowColor: color,
    shadowRadius: 1,
    shadowOpacity: 1,
  }

  const size = Math.floor(Math.random() * 4 + 1);

  const basicStyles = {
    width: size,
    height: size,
    transform: [{translateX: x}, {translateY: y}],
    shadowOffset: {width: size/4, height: 0}
  }

  return (
    <Circle style={[basicStyles, starStyles]}></Circle>
  )
}

export default Star