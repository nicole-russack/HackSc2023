import React, { useState, useEffect } from 'react'
import { DeviceMotion } from 'expo-sensors';
import AltitudeMarker from './AltitudeMarker';

// the height prop is from -1 (bottom of screen) to 1 (the top)
const Altimeter = ({ targetPitch }) => {

  const [pitch, setPitch] = useState(0);
  
  useEffect(() => {
    DeviceMotion.addListener(({ rotation }) => {
      const rawPitch = rotation.beta * 180 / Math.PI;
      setPitch(Math.min(Math.max(rawPitch, -90), 90));
    });

    DeviceMotion.setUpdateInterval(200);

    return () => DeviceMotion.removeAllListeners();
  });

  return (
    <>
      <AltitudeMarker altitude={pitch} targetAltitude={targetPitch} />
    </>
  )
}

export default Altimeter