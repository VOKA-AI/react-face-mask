export class Camera {
	constructor(videoElement, outputElement) {
      this.video = videoElement;
      this.canvas = outputElement;
      this.ctx = this.canvas.getContext('2d');
	}

	async getUserMeia(config) {
		if(navigator.mediaDevices.getUserMedia) {
			this.video.srcObject = await navigator.mediaDevices.getUserMedia(config);
		} else {
			alert("API不可用");
		}
	}

	static async build(videoElement, outputElement) {
		if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			alert("您的设备不支持访问摄像头");
		}
		const targetFPS = 60;
		const videoConfig = {
			'audio' : false,
			'video': {
				facingMode: 'user',
				frameRate: {
					ideal: targetFPS,
				},
			},
        
		};
		const camera = new Camera(videoElement, outputElement);
		await camera.getUserMeia(videoConfig);
		await new Promise((resolve) => {
			camera.video.onloadedmetadata = () => {
				resolve(this.video);
			};
		});
		camera.video.play();
		return camera;
	}
}