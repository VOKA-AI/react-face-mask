import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as faceMesh from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils'
import { Face } from "kalidokit";
import { fovHeight, dictSortByValue, dictMax } from './utils'

let _videoElement = null;
let threeObject3D = null;
let threeCamera = null;

let x = 0;
let y = 0;
let z = 0;
let rx = 0;
let ry = 0;
let rz = 0;

function update(riggedFace) {
    //console.log(riggedFace.head.x);
  if(!riggedFace || !threeObject3D) {
    return;
  }
  let mouth_shape = Object.keys(dictMax(riggedFace.mouth.shape))[0];
  console.log(mouth_shape);

  let fov_height = fovHeight(threeCamera.fov, threeCamera.position.z);
  let fov_width = fov_height * threeCamera.aspect;
  y = fov_height / 2;
  x = fov_width / 2;

    rx = - riggedFace.head.degrees.x / 30;
    ry = - riggedFace.head.degrees.y / 30;
    rz = riggedFace.head.degrees.z / 30;
    //modelUpdate(rx);
    if (riggedFace.eye.l === 0) {
          //start_play();
    } else {
          //console.log("stop");
    }
  // set position
  //threeObject3D.position.set(x,y,z);


  // set rotation and apply it to position
  threeObject3D.rotation.x = rx;
  threeObject3D.rotation.y = ry;
  threeObject3D.rotation.z = rz;
}

function onResults(results) {
    if(results.multiFaceLandmarks.length < 1) {
        console.log(results);
        return;
    }

    let riggedFace;
    riggedFace = Face.solve(results.multiFaceLandmarks[0], {
        runtime:'mediapipe',
        video: _videoElement,
        imageSize:{
            width: _videoElement.style.width,
            height: _videoElement.style.height,
        },
    });
    update(riggedFace);
}

export function initFaceMesh(videoElement, faceFollower, _threeCamera) {
    _videoElement = videoElement;
    threeObject3D = faceFollower;
    threeCamera = _threeCamera;
    const faceMeshModel = new faceMesh.FaceMesh({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }});

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await faceMeshModel.send({image: videoElement});
    },
    width: videoElement.style.width,
    height: videoElement.style.height
    });
    camera.start();

    faceMeshModel.onResults(onResults);
}
