import React  from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Model from './Model'
import Model2 from './Model2'
import Model3 from './Model3'
import { useState, useEffect, useRef } from 'react'
import { Camera } from './Camera'
import { FaceDetector } from './FaceDetector'
import { fovHeight } from './utils'

let x = 0;
let y = 0;
let z = 0;
let rx = 0;
let ry = 0;
let rz = 0;

let detector;
let camera;

let videoElement;
let outputElement;
let FaceFollowerObject3D;

let threeFiber;

export default function FaceFollower(props) {
  const objRef = useRef();
  threeFiber = useThree();


  useEffect(() => {
    FaceFollowerObject3D = objRef.current;
    videoElement = document.getElementById(props.videoID);
    outputElement = document.getElementById(props.outputID);

    const initFaceDetector = async () => {
      detector = await FaceDetector.build();
    }

    const initCamera = async () => {
      camera = await Camera.build(videoElement, outputElement);
    }

    initFaceDetector().catch(console.error);
    initCamera().catch(console.error);
  });

  useFrame((state, delta, xrFrame) => {
    if (detector && detector != null && camera && camera != null) {
      const detectFace = async () => {
        let faces = await detector.detect(camera.video);
        // let faces = await detector.detect(videoElement);
        update(faces, FaceFollowerObject3D);
      };
      detectFace()
    }
  });

  return (
  	<mesh ref={objRef}>
  	  <Model3 />
  	</mesh>
  )
}

function update(faces, threeObject3D) {
  if(!faces || faces.length < 1 || !threeObject3D) {
    return;
  }

  let riggedFace = detector.solve(videoElement);

  if(faces.length > 0) {
    let threeCamera = threeFiber.camera;
    let fov_height = fovHeight(threeCamera.fov, threeCamera.position.z);
    let fov_width = fov_height * threeCamera.aspect;
    //y = fov_height / 2;
    //x = fov_width / 2;
    console.log(riggedFace.head);
    console.log(faces[0].keypoints[1])

    rx = - riggedFace.head.degrees.x / 30;
    ry = - riggedFace.head.degrees.y / 30;
    rz = riggedFace.head.degrees.z / 30;
    if (riggedFace.eye.l === 0) {
          //start_play();
    } else {
          //console.log("stop");
    }
  }
  // set position
  threeObject3D.position.set(x,y,z);


  // set rotation and apply it to position
  threeObject3D.rotation.x = rx;
  threeObject3D.rotation.y = ry;
  threeObject3D.rotation.z = rz;
}
