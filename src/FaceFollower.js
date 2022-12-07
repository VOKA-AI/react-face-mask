import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { initFaceMesh } from './FaceDetector'

import Model, { modelUpdate } from './Model2';
import DebuggerModel from './debug/model_debugger';

export default function FaceFollower(props) {
  const objRef = useRef();
  let threeFiber = useThree();

  useEffect(() => {
    let FaceFollowerObject3D = objRef.current;
    let videoElement = document.getElementById(props.videoID);
    let outputElement = document.getElementById(props.outputID);
    initFaceMesh(videoElement, FaceFollowerObject3D, threeFiber.camera, outputElement);
  });

  return (
  	<mesh ref={objRef}>
          <DebuggerModel modelName="/Duck2.glb" />
  	  <Model modelName="/Duck3.glb" scale="3.8" />
  	</mesh>
  )
}
