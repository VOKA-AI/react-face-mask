import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { initFaceMesh } from './FaceDetector'

import Model from './Model2';

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
  	  <Model modelName="/Duck3.glb" scale="3" />
  	</mesh>
  )
}
