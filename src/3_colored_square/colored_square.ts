import {ShaderType, createProgram, loadShader} from '../utils';

import frg_glsl from './fragment.glsl';
import vtx_glsl from './vertex.glsl';


export class ColoredSquare {

    render(gl: WebGL2RenderingContext): void {

        // Shaders
        const vtx_shader = loadShader(gl, ShaderType.vertex, vtx_glsl);
        const frg_shader = loadShader(gl, ShaderType.fragment, frg_glsl);
        const program = createProgram(gl, vtx_shader, frg_shader);

        // Uniforms and attributes
        const coeffUniformRef = gl.getUniformLocation(program, "coefficient");
        const vertexPosAttrRef = gl.getAttribLocation(program, "vertexPosition");
        const vertexColorAttrRef = gl.getAttribLocation(program, "vertexColor");

        // Square points
        const squareBufferRef = gl.createBuffer();
        const squarePoints = new Float32Array([
            -1.0, -1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareBufferRef);
        gl.bufferData(gl.ARRAY_BUFFER, squarePoints, gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexPosAttrRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPosAttrRef);

        // Square point color
        const colorBufferRef = gl.createBuffer();
        const colors = new Float32Array([
            1.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRef);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexColorAttrRef, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexColorAttrRef);

        gl.useProgram(program);

        gl.uniform1f(coeffUniformRef, 0.5);

        gl.clearColor(0.0, 0.4, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squarePoints.length / 2);
    }

}