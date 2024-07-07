export const vertex = `
varying vec2 vUv;
uniform vec2 uOffset;
uniform float uAmplitude;
float PI = 3.141592653589793238;

void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.x += sin(uv.y * PI) * uOffset.x * uAmplitude;
    newPosition.y += sin(uv.x * PI) * uOffset.y * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`
