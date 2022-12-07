import ThreeDPoint from './ThreeDPoint'

export default class ThreeDLine {
    /*
     * 三维直角坐标系中,直线的表达方式如下:
     *  两点对称式
     *  平面交叉
     */
    constructor(point1: ThreeDPoint, point2: ThreeDPoint) {
      // 3维空间中，2个点确定一条直线
      // 直线的两点对称式表达:
      // (x - point1.x) / (point2.x - point1.x) = (y - point1.y) / (point2.y - point1.y) = (z - point1.z) / (point2.z - point1.z)
      // (x - A) / D1 = (y - B) / D2 = (z - C) / D3

    }

    distance(point: ThreeDPoint) {
      // 计算直线和一个TreeDPoint类型点的距离
      // 计算思路：
      //   找出point垂直于直线的点point2，两点见的距离就是点到直线间的最短距离。
      // 计算流程:
      //  1. 找以直线为法线的平面，同时point也在该平面上
      //  2. point在该平面上，与直线相交的点就是point2
      //  3. 计算两点间距离
      return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) + Math.pow(this.z - point.z, 2));
    }

    normalLinePlane(point: ThreeDPoint) {
      // 计算以该直线为法线，并包含点point的平面
    }
}
