import ThreeDPoint from './ThreeDPoint'
import ThreeDLine from './ThreeDLine'

// 以一个直线和一个点,构建以直线为法线,且经过点的平面
export construct PlaneFromLinePoint(line: ThreeDLine, point: ThreeDPoint) {
}

export default class ThreeDLine {
    /*
     * 三维直角坐标系中,平面的表达方式如下:
     */

    constructor(A, B, C, D) {
      // 三维直角坐标系中，平面的表达方式：
      // Ax + By + Cz = D
    }

    normalLine() {
      // 计算平面的法线
    }
}
