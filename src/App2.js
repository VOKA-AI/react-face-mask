import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { useState }from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import Model from "./Model"
import Model2 from "./Model2"
import { Suspense } from 'react'

function MyAnimationBox() {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false)
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = Math.sin(a)
  });

  return (
    <animated.mesh scale = {scale} onClick={() => setActive(!active)} ref={myMesh}>
      <boxGeometry />
      <meshBasicMaterial color="hotpink" />
    </animated.mesh>
  )
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight />
        <Model />
      </Canvas>
    </div>
  );
}

export default App;
