export default class ThreeDPoint {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    distance(point: ThreeDPoint) {
      // 计算和另一个TreeDPoint类型点的距离
      return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2) + Math.pow(this.z - point.z, 2));
    }
}
