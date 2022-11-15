import { createModelDetector } from './detector'
import { Camera } from './camera'
import Model from './Model'
import Model2 from './Model2'
import { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

let detector, camera;
let initialized = false;
let threeObject3D = null;
let _threeFiber;
let x = 0;
let y = 0;
let z = 0;
let rx = 0;
let ry = 0;
let rz = 0;

async function init() {
  try {
    camera = await Camera.setupCamera();
    detector = await createModelDetector('MediaPipeFaceMesh');
  } catch (error) {
    console.log(error);
  }
}

function update(faces) {
      let threeCamera = _threeFiber.camera;
      //tan(<horizontal FoV>/2), in radians (threeCamera.fov is vertical FoV)
      const halfTanFOVX = Math.tan(threeCamera.aspect * threeCamera.fov * Math.PI/360);
      if(faces.length > 0) {
        x = faces[0].keypoints[1].x / 100 - 2.8;
        y = 0.5 - faces[0].keypoints[1].y / 150;
        z = -faces[0].keypoints[1].z / 20;
        console.log([x,y,z]);
      }

      //rx = rx + 0.01;
      //ry = ry + 0.01;
      // rz = rz + 0.01;
      // x = x + 0.01;
      // y = y + 0.01;
      // z = z + 0.01;

      // set position
      // x increate means move to right, decrease means move to left
      // y increate means move to up, decrease means move to down
      // z increate means become bigger, decrease means become smaller
      threeObject3D.position.set(x, y, z);

      // set rotation and apply it to position
      // change rx means rotate about the x-axis
      // change ry means rotate about the y-axis
      // change rz means rotate about the z-axis
      threeObject3D.rotation.set(rx, ry, rz, "ZYX");
      threeObject3D.position.applyEuler(threeObject3D.rotation);
    
}

export default function FaceFollower(props) {
    const objRef = useRef()
    useEffect(() => {
      threeObject3D = objRef.current
      // threeObject3D.position.set(0.0*0.2, -1*0.2, -0.6);
    });
    _threeFiber = useThree();
    return (
      <mesh ref={objRef}>
        <Model scale={0.01} />
      </mesh>
    )
}

function end() {
  detector.dispose();
}

async function detect() {
  let faces;
  if (detector != null) {
    try {
      faces = await detector.estimateFaces(camera.video);
      console.log(faces);
      update(faces);
      return faces;
    } catch (error) {
      console.log(error);
    }
  }
}

async function loop() {
    detect();
    requestAnimationFrame(loop);
}

export async function show_camera_and_detect_face() {
  await init();
  loop();
}
