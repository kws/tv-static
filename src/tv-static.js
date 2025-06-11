export class TVStatic {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl");
    this.program = null;
    this.locations = {};
    this.isRunning = false;
    this.animationId = null;
    this.lines = 120; // number of vertical lines (like a 240p CRT)
    
    if (!this.gl) {
      throw new Error("WebGL not supported");
    }
    
    this.init();
  }

  async init() {
    await this.loadShaders();
    this.setupGeometry();
    this.setupEventListeners();
    this.resizeCanvas();
  }

  async loadShaders() {
    try {
      const [vertexSource, fragmentSource] = await Promise.all([
        fetch('./src/shaders/vertex.glsl').then(r => r.text()),
        fetch('./src/shaders/fragment.glsl').then(r => r.text())
      ]);

      const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, vertexShader);
      this.gl.attachShader(this.program, fragmentShader);
      this.gl.linkProgram(this.program);
      this.gl.useProgram(this.program);

      // Get uniform and attribute locations
      this.locations = {
        position: this.gl.getAttribLocation(this.program, "a_position"),
        time: this.gl.getUniformLocation(this.program, "u_time"),
        lines: this.gl.getUniformLocation(this.program, "u_lines"),
        resolution: this.gl.getUniformLocation(this.program, "u_resolution")
      };
    } catch (error) {
      console.error('Failed to load shaders:', error);
      throw error;
    }
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader);
      this.gl.deleteShader(shader);
      throw new Error(`Shader compilation error: ${error}`);
    }
    
    return shader;
  }

  setupGeometry() {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), this.gl.STATIC_DRAW);

    this.gl.enableVertexAttribArray(this.locations.position);
    this.gl.vertexAttribPointer(this.locations.position, 2, this.gl.FLOAT, false, 0, 0);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.render(0);
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  render(time) {
    if (!this.isRunning) return;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform1f(this.locations.time, time * 0.001);
    this.gl.uniform1f(this.locations.lines, this.lines);
    this.gl.uniform2f(this.locations.resolution, this.canvas.width, this.canvas.height);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    this.animationId = requestAnimationFrame((t) => this.render(t));
  }

  setLines(lines) {
    this.lines = lines;
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', () => this.resizeCanvas());
    if (this.program) {
      this.gl.deleteProgram(this.program);
    }
  }
}
