#version 300 es
 
precision highp float;
 
uniform sampler2D toDisplay;
in vec2 uv;
out vec4 outColor;
 
void main() {
  outColor = texture(toDisplay, uv);
}