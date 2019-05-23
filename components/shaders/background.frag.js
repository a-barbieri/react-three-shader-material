export const fragment = `
  precision   mediump   float;
  
  varying highp vec2 vUv;

  void main()
  {
    // Get viewport coordinates
    vec2 coord = vUv;
    
    // Second Release
    gl_FragColor = vec4( vec3(coord.x), 1.0 );
  }
`;
