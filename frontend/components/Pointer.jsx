import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
    Text,
} from 'native-base'

const Pointer = ({ targetHeading }) => {
    
    return (
        <Box style={{
          width: 3,
          height: 45,
          backgroundColor: 'white',
          zIndex: 40
        }}></Box>
    )
}

export default Pointer