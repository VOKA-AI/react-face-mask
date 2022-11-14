import { isMobile } from './utils';

const VIDEO_SIZE = {
  '640 X 480': {width: 640, height: 480},
  '640 X 360': {width: 640, height: 360},
  '360 X 270': {width: 360, height: 270}
};

export class Camera {
    constructor() {
      this.video = document.getElementById('video');
      this.canvas = document.getElementById('output');
      this.ctx = this.canvas.getContext('2d');
    }

    /**
      * Initiate a Camera instance and wait for the camera stream to be ready.
      * @param cameraParam, include targetFPS, sizeOption, etc.
      */
    static async setupCamera(cameraConfig) {
      if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error (
          "Brower API navigator.mediaDevices.getUserMedia not available");
      }
      const targetFPS = 60;
      const sizeOption = '640 X 480';
      const $size = VIDEO_SIZE[sizeOption];
      const videoConfig = {
        'audio' : false,
        'video': {
          facingMode: 'user',
          width: isMobile() ? VIDEO_SIZE['360 X 270'].width : $size.width,
          height: isMobile() ? VIDEO_SIZE['360 X 270'].height : $size.height,
          frameRate: {
            ideal: targetFPS,
          },
        },
        
      };
      const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
      const camera = new Camera();

      camera.video.srcObject = stream;


      await new Promise((resolve) => {
        camera.video.onloadedmetadata = () => {
          resolve(this.video);
        };
      });
      camera.video.play();
      const videoWidth = camera.video.videoWidth;
      const videoHeight = camera.video.videoHeight;
      camera.video.width = videoWidth;
      camera.video.height = videoHeight;
      // const canvasContainer = document.querySelector('.canvas-wrapper');
      // canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;
      camera.ctx.translate(camera.video.videoWidth, 0);
      camera.ctx.scale(-1, 1);
      return camera;
    }
}
