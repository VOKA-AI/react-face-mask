import React  from 'react'
import { useFrame } from '@react-three/fiber'
import Model from './Model'
import { useState, useEffect, useRef } from 'react'
import { Camera } from './camera'
import { FaceDetector } from './FaceDetector'

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

export default function FaceFollower() {
  const objRef = useRef()

  useEffect(() => {
    FaceFollowerObject3D = objRef.current;
    videoElement = document.getElementById('video');
    outputElement = document.getElementById('output');

    const initFaceDetector = async () => {
      detector = await FaceDetector.build();
    }

    const initCamera = async () => {
      //camera = await Camera.build(videoElement, outputElement);
      camera = await Camera.setupCamera();
    }

    initFaceDetector().catch(console.error);
    initCamera().catch(console.error);
  });

  useFrame((state, delta, xrFrame) => {
    if (detector && detector != null && camera && camera != null) {
      const detectFace = async () => {
        let faces = await detector.detect(camera.video);
        update(faces, FaceFollowerObject3D);
      };
      detectFace()
    }
  });
  
  return (
  	<mesh ref={objRef}>
  	  <Model />
  	</mesh>
  )
}

function update(faces, threeObject3D) {
  if(!faces || faces.length < 1 || !threeObject3D) {
    return;
  }
  let riggedFace = detector.solve(videoElement);

  if(faces.length > 0) {
       //x = faces[0].keypoints[1].x / 100 - 3;
       //y = 2.5 - faces[0].keypoints[1].y / 100;
       //z = 1 -faces[0].keypoints[1].z / 20;
       //   x = riggedFace.head.position.x  - 319;
       //   y = riggedFace.head.position.y  - 228.3;
       //   z = riggedFace.head.position.z - 49.5;
         //x += 0.01;

    rx = - riggedFace.head.degrees.x / 30;
    ry = - riggedFace.head.degrees.y / 30;
    rz = riggedFace.head.degrees.z / 30;
        // console.log([x,y,z]);
        //console.log([rx,ry,rz]);
    if (riggedFace.eye.l === 0) {
          //start_play();
    } else {
          //console.log("stop");
    }
  }
      //


      // set position
  threeObject3D.position.set(x,y,z);
      //threeObject3D.geometry.translate(3, 0, 0);


      // set rotation and apply it to position
  threeObject3D.rotation.x = rx;
  threeObject3D.rotation.y = ry;
  threeObject3D.rotation.z = rz;
      //threeObject3D.rotation.set(rx, ry, rz, "ZYX");
      //threeObject3D.position.applyEuler(threeObject3D.rotation);

      //  let _threeTranslation = new Vector3();
      //  _threeTranslation.set(x, y + 0.2, z + 0.6);
      //  threeObject3D.position.add(_threeTranslation);
}
