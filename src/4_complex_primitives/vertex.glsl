#version 300 es
 

in vec2 vertexPosition;
in vec4 vertexColor;
uniform float coefficient;

out vec4 frgColor;

void main() {
  gl_Position = vec4(coefficient * vertexPosition, 0.0, 1.0);
  frgColor = vertexColor;
}