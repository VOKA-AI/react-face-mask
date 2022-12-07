/*
 * 在目标canvas上画点
 */

export default class drawUtils {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.WebGL = canvasElement.getContext("webgl") || canvasElement.getContext("experimental-webgl");
    this.initWebGL();
  }

  initWebGL() {
    // 顶点着色器
    const VSHADER_SOURCE = [
        'attribute vec4 a_Position;', // 定义一个变量
        'void main() {',
        '    gl_Position = a_Position;', // 定义点的位置
        '    gl_PointSize = 1.0;', // 定义点的大小
        '}',
    ].join('\n')

    // 片原着色器
    const FSHADER_SOURCE = [
        'precision mediump float;',
        'void main() {',
        '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
        '}',
    ].join('\n')

    if (this.WebGL) {
      this.program = this.initWebGLShader(VSHADER_SOURCE, FSHADER_SOURCE);
    }
  }

  initWebGLShader(vertexShaderSource, fragmentShaderSource) {
    // 顶点着色器对象
    var vertexShader = this.WebGL.createShader(this.WebGL.VERTEX_SHADER);
    // 片元着色器对象
    var fragmentShader = this.WebGL.createShader(this.WebGL.FRAGMENT_SHADER);
    // 引入顶点着色器源码
    this.WebGL.shaderSource(vertexShader, vertexShaderSource);
    this.WebGL.shaderSource(fragmentShader, fragmentShaderSource);
    // 编译着色器
    this.WebGL.compileShader(vertexShader);
    this.WebGL.compileShader(fragmentShader);
    // 创建程序对象program
    var program = this.WebGL.createProgram();
    // 绑定着色器
    this.WebGL.attachShader(program, vertexShader);
    this.WebGL.attachShader(program, fragmentShader);
    // 链接program
    this.WebGL.linkProgram(program);
    // 使用program
    this.WebGL.useProgram(program);
    return program;
  }

  draw_points(points, color) {
    var a_Position = this.WebGL.getAttribLocation(this.program, 'a_Position');
    for (let i = 0, len = points.length; i < len; i += 1) {
      this.WebGL.vertexAttrib3f(a_Position, points[i]['x'], 1 - points[i]['y'], points[i]['z']) // 设置属性值
      this.WebGL.drawArrays(this.WebGL.POINTS, 0, 1) // 画点
    }
  }
}
