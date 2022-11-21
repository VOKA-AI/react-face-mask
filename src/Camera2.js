export class Camera {
	constructor(videoElement, outputElement) {
      this.video = videoElement;
      this.canvas = outputElement;
      this.ctx = this.canvas.getContext('2d');
	}
	//const [stream, setStream] = useState(null);
	async getUserMediaSuccess(stream) {
		alert(stream);
		this.video.srcObject = stream;
		//setStream(stream);
	}

	getUserMediaFailed(error) {
		alert(error);
		alert("获取摄像头权限失败");
	}

	async getUserMeia(config) {
		console.log(this.video);
		console.log(this.canvas);
		if(navigator.mediaDevices.getUserMedia) {
			console.log(config);
			navigator.mediaDevices.getUserMedia(config).then(this.getUserMediaSuccess).catch(this.getUserMediaFailed);
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
		this.video.play();
		return camera;
	}
}