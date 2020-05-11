#version 300 es
 
in vec4 vertexPosition;
out vec2 uv;

void main() {
  gl_Position = vertexPosition;
  uv = (vertexPosition.xy + 1.0) / 2.0;
}