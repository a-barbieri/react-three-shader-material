export const fragment = `
  precision   mediump   float;
  
  varying highp vec2 vUv;
  
  uniform sampler2D u_texture;
  uniform float u_current_time;
  
  void main() {
    vec4 color = texture2D(u_texture, vUv);
    float test = u_current_time;
    // float test = sin(u_current_time)*0.5 + 0.5;
    gl_FragColor = vec4(test, vUv, 1.0);
  }
`;
