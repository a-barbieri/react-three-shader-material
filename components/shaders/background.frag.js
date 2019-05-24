export const fragment = `
  precision   mediump   float;
  
  varying highp vec2 vUv;
  
  uniform sampler2D u_texture;

  void main() {
  
    vec4 color = texture2D(u_texture, vUv);

    gl_FragColor = vec4(color);
  }
`;
