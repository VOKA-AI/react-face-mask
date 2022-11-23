import * as faceMesh from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { Face } from "kalidokit";
import { modelUpdateBlandshape } from './Model'

let _videoElement = null;
let threeObject3D = null;
let threeCamera = null;

let x = 0;
let y = 0;
let z = 0;
let rx = 0;
let ry = 0;
let rz = 0;

function updateModelBlandshape(blandshape) {
    modelUpdateBlandshape(blandshape);
}

function updateModelPosition(model, position) {
    model.position.set(position['x'], position['y'], position['z']);
}

function updateModelRotation(model, rotation) {
  // set rotation and apply it to position
  model.rotation.x = rotation['x'];
  model.rotation.y = rotation['y'];
  model.rotation.z = rotation['z'];
}

function updateModelRotationEuler(model, euler) {

}

function update(riggedFace) {
  if(!riggedFace || !threeObject3D) {
    return;
  }

  updateModelBlandshape({'browInnerUp':1,'browDown_L':1,'cheekPuff':1});
  // set position
  updateModelPosition(threeObject3D, {'x':x, 'y':y, 'z':z});

  // set rotation and apply it to position
  rx = - riggedFace.head.degrees.x / 30;
  ry = - riggedFace.head.degrees.y / 30;
  rz = riggedFace.head.degrees.z / 30;
  updateModelRotation(threeObject3D, {'x': rx, 'y': ry, 'z':rz});
}

function onResults(results) {
    if(results.multiFaceLandmarks.length < 1) {
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
