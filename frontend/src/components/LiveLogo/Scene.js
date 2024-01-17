import React, { Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import { Sparks } from './Sparks';
import { SparkStorm } from './SparkStorm';
import { SpaceDust } from './SpaceDust';
import { Planet } from './Planet';

const colors = {
  malevolentIllusion: [
    '#808080',
    '#FFFFFF',
    // '#df86df',
    // '#d998ee',
    // '#ceadf4',
    // '#c6bff9',
  ],
  sunnyRainbow: [
    '#808080',
    '#FFFFFF',
  ],
};

export const Controls = (props) => {
  const { gl, camera } = useThree();
  return <orbitControls args={[camera, gl.domElement]} {...props} />;
};

export function Scene() {
  return (
    <Suspense fallback={null}>
      <>
        {/* <Controls /> */}
        <pointLight distance={100} intensity={4} color="white" />
        <group>
          <Planet />
          {/* <SpaceDust count={500} /> */}
          <Sparks count={20} colors={colors.malevolentIllusion} />
          <SparkStorm count={500} colors={colors.sunnyRainbow} />
        </group>
      </>
    </Suspense>
  );
}
