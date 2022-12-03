import * as faceMesh from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { Face } from "kalidokit";
import { modelUpdateBlandshape } from './Model';
import FacePositionDebugger from './debug/debug_utils';
import { mediapipeConfigOptions } from './config';

var _videoElement = null;
var threeObject3D = null;
var threeCamera = null;
var _riggedFace = null;
var faceDebugger = null;
var 
var x = 3;
var y = 3;
var z = -3;
var rx = 0;
var ry = 0;
var rz = 0;

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
  _riggedFace = riggedFace;

  updateModelBlandshape({'eyeBlink_L':1 - riggedFace.eye.r,'eyeBlink_R':1 - riggedFace.eye.l, 'mouthFunnel':riggedFace.mouth.shape.A, 'mouthLeft':riggedFace.mouth.shape.A / 10, 'mouthRight':riggedFace.mouth.shape.A / 10, 'mouthFrown_L':riggedFace.mouth.shape.A / 5, 'mouthFrown_R':riggedFace.mouth.shape.A / 5, 'jawOpen':riggedFace.mouth.shape.A / 5});

  // set position
  x = (riggedFace.head.position.x - 155) / 26;
  y = - (riggedFace.head.position.y - 115) / 30;
  z = (riggedFace.head.position.z - 15) / 3;
  updateModelPosition(threeObject3D, {'x':x, 'y':y, 'z':z});

  // set rotation and apply it to position
  rx = - (riggedFace.head.degrees.x - 15) / 50;
  ry = - riggedFace.head.degrees.y / 50;
  rz = riggedFace.head.degrees.z / 50;
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
            width: parseInt(_videoElement.style.width),
            height: parseInt(_videoElement.style.height),
        },
    });
    // faceDebugger.updateFace(riggedFace);
    update(riggedFace);
}

export function initFaceMesh(videoElement, faceFollower, _threeCamera) {
    _videoElement = videoElement;
    threeObject3D = faceFollower;
    threeCamera = _threeCamera;
    const faceMeshModel = new faceMesh.FaceMesh({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }});
   
    faceMeshModel.setOptions(mediapipeConfigOptions);

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await faceMeshModel.send({image: videoElement});
    },
    width: videoElement.style.width,
    height: videoElement.style.height
    });
    camera.start();

    // faceDebugger = new FacePositionDebugger(videoElement, _threeCamera, threeObject3D);

    faceMeshModel.onResults(onResults);
}
