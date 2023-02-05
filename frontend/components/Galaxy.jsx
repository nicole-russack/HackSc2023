import React, { useState, useEffect } from 'react'
import {
    Box,
    Center,
    NativeBaseProvider,
    Text,
} from 'native-base'
import Star from './Star';

const Galaxy = ({ rotation }) => {
  
  const [stars, setStars] = useState([]);

  const numStars = 0;
  const size = 800;

  useEffect(() => {
    setStars([]);

    for(let i = 0; i < numStars; i++) {
      setStars(prevStars => {
        const rx = Math.floor(Math.random() * size - size / 2);
        const ry = Math.floor(Math.random() * size - size / 2);
        prevStars.push(<Star key={i} x={rx} y={ry} />);
        
        return prevStars;
      });
    }
  }, [])

  const styles = {
    transform: [{rotate: `${-rotation}deg`}],
    position: 'absolute',
    zIndex: -1
  }

  return (
    <Box style={styles}>
      {stars}
    </Box>
  )
}

export default Galaxy