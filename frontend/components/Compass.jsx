import React from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
    Text,
} from 'native-base'

const Compass = ({rotation}) => {

    return (
        <Box style={{transform: [{rotate: `${rotation}deg`}]}}>
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
                    borderBottomColor: "white",}} />
            </Center>

            {/* Compass Circle */}
            <Box style={{borderColor: 'gray', borderWidth: 5, borderStyle: 'dotted', borderRadius: 200, width: 325, height: 325}}>
            </Box>

        </Box>
    )
}

export default Compass