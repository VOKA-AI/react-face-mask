import { createModelDetector } from './detector'
import { Camera } from './camera'
import Model from './Model'
import Model2 from './Model2'
import { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Face } from "kalidokit";
import { start_play, stop_play } from './Model'
import { Vector3 } from 'three'

const videoElement = document.getElementById('video');
let detector, camera;
let initialized = false;
let threeObject3D = null;
let _threeFiber;
let x = 0;
let y = 0;
let z = 3;
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
      let riggedFace = Face.solve(faces[0].keypoints);
   //   , {
   //      runtime: "mediapipe",
   //      video: videoElement,
   //    });
      // console.log(riggedFace);

      let threeCamera = _threeFiber.camera;
      //tan(<horizontal FoV>/2), in radians (threeCamera.fov is vertical FoV)
      // 计算Canvas中横向的FOV
      const halfTanFOVX = Math.tan(threeCamera.aspect * threeCamera.fov * Math.PI/360);

      const cz = Math.cos(riggedFace.head.degrees.z), sz = Math.sin(riggedFace.head.degrees.z);

      const W = 1;
      const DFront = 1 / ( 2 * W * halfTanFOVX); // 立方体的前面举例camera的距离
      const D = DFront + 0.5; // 立方体的中心举例camera的距离，这里假设立方体的边长为1
     
      // 计算面部框的2维中心点
      const xv = riggedFace.head.position.x / 150;
      const yv = riggedFace.head.position.y / 150; 

      // 计算立方体最终的3维坐标
      //z = -D;
      //x = xv * D * halfTanFOVX;
      //y = yv * D * halfTanFOVX / 1;
      


      //rx = - riggedFace.head.degrees.x / 30;
      //ry = - riggedFace.head.degrees.y / 30;
      //rz = riggedFace.head.degrees.z / 30;

      if(faces.length > 0) {
       x = faces[0].keypoints[1].x / 100 - 3;
       y = 2.5 - faces[0].keypoints[1].y / 100;
       z = 1 -faces[0].keypoints[1].z / 20;
       //   x = riggedFace.head.position.x  - 319;
       //   y = riggedFace.head.position.y  - 228.3;
       //   z = riggedFace.head.position.z - 49.5;
         //x += 0.01;

        rx = - riggedFace.head.degrees.x / 30;
        ry = - riggedFace.head.degrees.y / 30;
        rz = riggedFace.head.degrees.z / 30;
        // console.log([x,y,z]);
        console.log([rx,ry,rz]);
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

export default function FaceFollower(props) {
    const objRef = useRef()
    useEffect(() => {
      threeObject3D = objRef.current
      // threeObject3D.position.set(0.0*0.2, -1*0.2, -0.6);
    });
    _threeFiber = useThree();
    
    return (
        <mesh ref={objRef}>
          <Model />
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
