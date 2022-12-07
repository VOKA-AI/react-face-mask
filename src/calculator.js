import { RIGHT, LEFT } from './enum'
class FaceMeshCalculator {
    constructor() {
    }
    update(landmarks) {
      this.lm = landmarks;
    }
    eye(side) {
      /*
       * 返回[0,1]的值，0表示眼睛完全闭合，1表示完全睁开
       * side为LEFT表示左边眼睛，为RIGHT表示右边眼睛
       * 思路是计算眼睛的高度和宽度,计算宽高比,假设人类睁眼时宽/高 = 3,将计算的宽高比和3比较,得出眼睛睁开的比例
       */
    }
    eyeL() {
      return this.eye(LEFT);
    }

    eyeR() {
      return this.eye(RIGHT);
    }

    eyebrow(side) {
      /*
       * 返回[0,1]的值，0表示眉毛的放松状态，1表示眉毛上挑到最高点
       * side为LEFT表示左边眉毛，为RIGHT表示右边眉毛
       * 内外眼角连线, 计算眉毛距离该线的距离。假设人类眉毛距离这条线的最大距离为n，以此为基准，计算眉毛上跳的高度
       */
    }

    eyebrowL() {
      return this.eyebrow(LEFT);
    }

    eyebrowR() {
      return this.eyebrow(RIGHT);
    }

    pupil(side) {
      /*
       * 结合眼睛和瞳孔的点,计算瞳孔在眼睛中的位置
       * x轴上,以内外眼角的中点为0,往左为负数,往右为整数,在[-1.1]之间
       * y轴上,以上下眼皮的中点为0,往下为负数,往上为整数,在[-1.1]之间
       * 返回{x:x_value, y: y_value}
       */
    }

    pupilL() {
      return this.pupil(LEFT);
    }

    pupilR() {
      return this.pupil(RIGHT);
    }
}
