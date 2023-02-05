import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
    Text,
} from 'native-base'

const Pointer = ({ color }) => {
    
    return (
        <Box style={{
        //   position: 'absolute',
        //   transform: [{translateY: -155}],
          position: 'relative',
          top: 5,
          width: 3,
          height: 45,
          backgroundColor: color,
          zIndex: 40
        }}></Box>
    )
}

export default Pointer