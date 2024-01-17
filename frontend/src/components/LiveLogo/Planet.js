import React from 'react';
import { TextureLoader } from 'three';

const loader = new TextureLoader();
const matcap = loader.load('5415.jpg');

export const Planet = () => {
  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[12, 32, 32]} />
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
};
