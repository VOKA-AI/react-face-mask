import { createModelDetector } from './detector'
import { Camera } from './camera'

let detector, camera;
let initialized = false;

async function init() {
  try {
    camera = await Camera.setupCamera();
    detector = await createModelDetector('MediaPipeFaceMesh');
  } catch (error) {
    console.log(error);
  }
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
