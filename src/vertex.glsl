#version 300 es
 

in vec2 vertexPosition;
uniform float coefficient;

void main() {
  gl_Position = vec4(coefficient * vertexPosition, 0.0, 1.0);
}