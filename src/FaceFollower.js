import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { initFaceMesh } from './FaceDetector'
import { Camera2 } from './camera';

import Model, { modelUpdate } from './Model2';
var camera;

export default function FaceFollower(props) {
  const objRef = useRef();
  let threeFiber = useThree();

  useEffect(() => {
    let FaceFollowerObject3D = objRef.current;
    let videoElement = document.getElementById(props.videoID);
    let outputElement = document.getElementById(props.outputID);
    const initCamera = async() => {
        camera = await Camera2.build(videoElement, outputElement);
    }
    initFaceMesh(videoElement, FaceFollowerObject3D, threeFiber.camera, outputElement);
    initCamera().catch(console.error);
  });
  useFrame((state, delta, xrFrame) => {
    console.log(camera)
  });

  return (
  	<mesh ref={objRef}>
  	  <Model modelName="/Mfers.glb" scale="10" />
  	</mesh>
  )
}
