export const vertex = `
varying vec2 vUv;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main()
{
   vUv = uv;
   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
   gl_Position = projectionMatrix * mvPosition;
}`;