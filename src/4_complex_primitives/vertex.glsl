#version 300 es
 

in vec2 vertexPosition;
in vec4 vertexColor;
uniform vec2 translation;
uniform float angle;
uniform float coefficient;

out vec4 frgColor;

void main() {
  mat2 rotation;
  rotation[0] = vec2(cos(angle), sin(angle));
  rotation[1] = vec2(-sin(angle), cos(angle));
  vec2 newPosition = translation + rotation*vertexPosition;
  gl_Position = vec4(coefficient * newPosition, 0.0, 1.0);
  frgColor = vertexColor;
}