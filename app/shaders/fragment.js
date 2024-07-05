export const fragment = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uAlpha;
void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, uAlpha);
    // gl_FragColor = vec4(1., 0., 0., 1.);
}
`