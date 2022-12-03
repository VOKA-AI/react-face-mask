/**
 * mediapipe模型的配置项
 * selfieMode设为true会反转画面
 * maxNumFaces表示同时识别的脸的最大数量
 * refineLandmarks默认为false，此时landmarks的数量为468。设为true时，会增加嘴巴、眼睛和瞳孔周边的点，输出的landmarks的数量变为478
 * minDetectionConfidence表示最小的识别可信度，太大或太小，都会导致landmarks的位置发生抖动。
 * minTrackingConfidence同上
 */
export const mediapipeConfigOptions = {
  selfieMode: false,
  enableFaceGeometry: false,
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
};
