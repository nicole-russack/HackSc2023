import React from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
} from 'native-base'

const Compass = () => {
    return (
        <Box style={{borderColor: 'gray', borderWidth: 5, borderStyle: 'dotted', borderRadius: 200, width: 325, height: 325}}>
            <Center>
                <Box style={{height: 25, width: 0, borderColor: 'red', borderWidth: 1}} />
            </Center>
        </Box>
    )
}

export default Compass