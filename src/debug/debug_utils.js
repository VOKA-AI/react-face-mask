import { fovHeight, fovWidth } from '../utils';

var _videoElement = null;
var _threeCamera = null;
var _threeObject3D = null;
var _riggedFace = null;
var x = 0;
var y = 0;
var z = 0;

/*
 * 获取面部在三维坐标系的位置后，需要确定模型在其坐标系中的位置
 * 这一点并不容易，目前想到的方案是：
 *  1. 手动把模型和面部放在一起（x、y、z）
 *  2. 按p键，打印面部和模型的x、y、z
 *  3. 重复一次，获取两对数据
 *  4. 根据这两对数据，接处面部x、y、z和模型x、y、z的线性关系
 *
 *  实际验证证明，大概可以实现跟随，但略有误差，需要手动调整。
 */
export default class FacePositionDebugger {
  constructor(videoElement, threeCamera, threeObject3D) {
    _videoElement = videoElement;
    _threeCamera = threeCamera;
    _threeObject3D = threeObject3D;
    window.addEventListener('click', this.clickEventHandler);
    window.addEventListener('keydown', this.keyDownEventHandler);
  }

  updateFace(riggedFace) {
    _riggedFace = riggedFace;
  }

  keyDownEventHandler(e) {
    if(e.code === 'ArrowUp') {
      z = z + 0.1;
    }
    if (e.code === 'ArrowDown') {
      z = z - 0.1;
    }
    if (e.code === 'KeyP') {
      console.log("x = " + x + ",y = " + y + ",z =" + z);
      console.log(this.riggedFace.head.position);
    }
    _threeObject3D.position.set(x, y, z);
  }

  clickEventHandler(e) {
    console.log(_videoElement);
    console.log(_threeCamera);
    console.log(_threeObject3D);
    let fh = fovHeight(_threeCamera.fov, _threeCamera.position.z);
    let fw = fovWidth(_threeCamera.fov, _threeCamera.position.z, _threeCamera.aspect);
    // this.videoElement.style.width -> [-fw / 2, fw / 2]
    // this.videoElement.style.height -> [-fh / 2, fh / 2]
  
    x = ((e.x - parseInt(_videoElement.style.width) / 2) / ( parseInt(_videoElement.style.width) / 2)) * (fw / 2);
    y = - ((e.y -  parseInt(_videoElement.style.height) / 2) / ( parseInt(_videoElement.style.height) / 2)) * (fh / 2);
    _threeObject3D.position.set(x, y, z);
  }
}
