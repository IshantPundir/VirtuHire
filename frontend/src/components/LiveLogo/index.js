import * as THREE from 'three';
import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshLine, MeshLineMaterial } from './MeshLine';
import { Scene } from './Scene';
import './style.css';

// DodecahedronBufferGeometry
extend({ MeshLine, MeshLineMaterial, OrbitControls});


const LiveLogo = () => {
    return (
        <Canvas
            pixelRatio={window.devicePixelRatio}
            camera={{ fov: 100, position: [0, 0, 30] }}
            onCreated={({ gl, size, camera }) => {
            if (size.width < 600) {
                camera.position.z = 45;
            }
            gl.setClearColor(new THREE.Color('#000000'));
            }}>
            <Scene />
        </Canvas>
    );
};
 
export default LiveLogo;