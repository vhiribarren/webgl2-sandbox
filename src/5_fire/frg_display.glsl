#version 300 es
 
precision highp float;
 
uniform sampler2D toDisplay;
out vec4 outColor;
 
void main() {
  outColor = texelFetch(toDisplay, ivec2(gl_FragCoord.xy), 0);
}