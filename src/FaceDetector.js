import * as faceMesh from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { Camera2 } from './camera';
import { Face } from "kalidokit";
import { modelUpdateBlandshape, modelUpdateModelPosition, modelUpdateModelRotation } from './Model2';
import FacePositionDebugger from './debug/debug_utils';
import drawUtils from './debug/draw_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';
import { mediapipeConfigOptions } from './config';
import { FaceMeshPoints, getFaceMeshPoints, LEFT, RIGHT } from './enum';

var _videoElement = null;
var threeObject3D = null;
var threeCamera = null;
var _riggedFace = null;
var faceDebugger = null;
var drawDebugger = null;

var canvasCtx = null;
var canvasElement = null;

var x = 0;
var y = 0;
var z = 0;
var rx = 0;
var ry = 0;
var rz = 0;

function update(riggedFace) {
  if(!riggedFace || !threeObject3D) {
    return;
  }
  _riggedFace = riggedFace;

  //modelUpdateBlandshape({'eyeBlink_L':1 - riggedFace.eye.r,'eyeBlink_R':1 - riggedFace.eye.l, 'mouthFunnel':riggedFace.mouth.shape.A, 'mouthLeft':riggedFace.mouth.shape.A / 10, 'mouthRight':riggedFace.mouth.shape.A / 10, 'mouthFrown_L':riggedFace.mouth.shape.A / 5, 'mouthFrown_R':riggedFace.mouth.shape.A / 5, 'jawOpen':riggedFace.mouth.shape.A / 5});
  modelUpdateBlandshape({'eye-R':1 - riggedFace.eye.r,'eye-L':1 - riggedFace.eye.l, 'eyes-_down': 0, 'mouse':riggedFace.mouth.shape.A});

  // set position
  //modelUpdateModelPosition({'x':riggedFace.head.position.x.toFixed(2), 'y':riggedFace.head.position.y.toFixed(2), 'z':riggedFace.head.position.z.toFixed(2)});

  // set rotation and apply it to position
  //modelUpdateModelRotation({'x': riggedFace.head.degrees.x.toFixed(2), 'y': riggedFace.head.degrees.y.toFixed(2), 'z':riggedFace.head.degrees.z.toFixed(2)});
}

function drawFaceMesh(landmarks) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_TESSELATION,
        {color: '#C0C0C070', lineWidth: 1});

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_RIGHT_EYE,
        {color: '#FF3030'});

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_RIGHT_EYEBROW,
        {color: '#FF3030'});

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_LEFT_EYE,
        {color: '#30FF30'});

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_LEFT_EYEBROW,
        {color: '#30FF30'});

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_FACE_OVAL,
        {color: '#E0E0E0'});

    drawingUtils.drawConnectors(
        canvasCtx, landmarks, faceMesh.FACEMESH_LIPS, {color: '#E0E0E0'});


    if(mediapipeConfigOptions.refineLandmarks) {
      drawingUtils.drawConnectors(
          canvasCtx, landmarks, faceMesh.FACEMESH_RIGHT_IRIS,
          {color: '#FF3030'});

      drawingUtils.drawConnectors(
          canvasCtx, landmarks, faceMesh.FACEMESH_LEFT_IRIS,
          {color: '#30FF30'});
    }
    canvasCtx.restore();
}

function onResults(results) {
    if(results.multiFaceLandmarks.length < 1) {
        return;
    }
    // drawFaceMesh(results.multiFaceLandmarks[0]);
    // drawDebugger.draw_points(results.multiFaceLandmarks[0], "#111111");
    //drawDebugger.draw_points(getFaceMeshPoints(results.multiFaceLandmarks[0], FaceMeshPoints.face_oval), "#111111");
    

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

export async function initFaceMesh(videoElement, faceFollower, _threeCamera, _canvasElement) {
    _videoElement = videoElement;
    canvasElement = _canvasElement;
    canvasCtx = canvasElement.getContext('2d');
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

    let camera2 = await Camera2.build(videoElement, canvasElement);
    console.log(camera2);

    // faceDebugger = new FacePositionDebugger(videoElement, _threeCamera, threeObject3D);
    let testCanvasElement = document.getElementById("test");
    drawDebugger = new drawUtils(testCanvasElement);

    faceMeshModel.onResults(onResults);
}
