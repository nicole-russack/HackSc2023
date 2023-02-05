import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
    Text,
} from 'native-base'
import Pointer from './Pointer'
import Compass from './Compass'
import Galaxy from './Galaxy'

const CompassContainer = ({ azimuth }) => {
  
  const [heading, setHeading] = useState(0);

  const handleHeadingChange = heading => {
    setHeading(heading);
  };

  return (
    <Center style={{
      position: 'relative',
      top: 110
    }}>
      <Pointer color={Math.round(heading) - Math.round(azimuth) === 0 ? '#4ced28' : 'white'}/>
      <Compass azimuth={azimuth} onHeadingChange={handleHeadingChange} />
      <Galaxy rotation={heading}/>
    </Center>
  )
}

export default CompassContainer