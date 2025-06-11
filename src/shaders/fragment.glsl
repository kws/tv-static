precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform float u_lines;
uniform vec2 u_resolution;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 grid = vec2(u_lines * aspect, u_lines); // block count: horizontal, vertical
  vec2 lowres_uv = floor(v_uv * grid) / grid;

  float noise = rand(vec2(lowres_uv.x * u_time, lowres_uv.y * u_time));
  float flicker = rand(vec2(u_time, lowres_uv.y)) * 0.1;
  float scanline = sin(lowres_uv.y * 800.0 + u_time * 50.0) * 0.05;
  float value = noise + flicker + scanline;

  gl_FragColor = vec4(vec3(value), 1.0);
}
