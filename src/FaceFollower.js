import React  from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Model from './Model'
import Model2 from './Model2'
import Model3, { modelUpdate } from './Model3'
import { useState, useEffect, useRef } from 'react'
import { initFaceMesh } from './FaceDetector'

export default function FaceFollower(props) {
  const objRef = useRef();
  let threeFiber = useThree();

  useEffect(() => {
    let FaceFollowerObject3D = objRef.current;
    let videoElement = document.getElementById(props.videoID);
    let outputElement = document.getElementById(props.outputID);
    initFaceMesh(videoElement, FaceFollowerObject3D, threeFiber.camera);
  });

  return (
  	<mesh ref={objRef}>
  	  <Model3 modelName="/FaceCap.glb"/>
  	</mesh>
  )
}
