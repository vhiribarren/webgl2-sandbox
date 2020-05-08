import {ShaderType, createProgram, loadShader} from '../utils';

import frg_glsl from './fragment.glsl';
import vtx_glsl from './vertex.glsl';


export class ComplexPrimitives {

    render(gl: WebGL2RenderingContext): void {

        // Shaders
        const vtx_shader = loadShader(gl, ShaderType.vertex, vtx_glsl);
        const frg_shader = loadShader(gl, ShaderType.fragment, frg_glsl);
        const program = createProgram(gl, vtx_shader, frg_shader);

        // Uniforms and attributes
        const coeffUniformRef = gl.getUniformLocation(program, "coefficient");
        const vertexPosAttrRef = gl.getAttribLocation(program, "vertexPosition");
        const vertexColorAttrRef = gl.getAttribLocation(program, "vertexColor");

        // Triangle
        const triangleVAO = (() => {
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);
            const triangleBufferRef = gl.createBuffer();
            const trianglePoints = new Float32Array([
                0.0, 1.5,
                1.5, -1.0,
                -1.5, -1.0,
            ]);
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleBufferRef);
            gl.bufferData(gl.ARRAY_BUFFER, trianglePoints, gl.STATIC_DRAW);
            gl.vertexAttribPointer(vertexPosAttrRef, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vertexPosAttrRef);
            // Square point color
            const colorBufferRef = gl.createBuffer();
            const colors = new Float32Array([
                1.0, 0.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
            ]);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRef);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            gl.vertexAttribPointer(vertexColorAttrRef, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vertexColorAttrRef);
            return vao;
        })();

        // Square
        const squareVAO = (() => {
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);
            const squareBufferRef = gl.createBuffer();
            const squarePoints = new Float32Array([
                -1.0, -1.0,     1.0, 1.0, 1.0, 1.0, // Coordinates, color
                -1.0, 1.0,      0.0, 1.0, 1.0, 1.0,
                1.0, -1.0,      1.0, 0.0, 1.0, 1.0,
                1.0, 1.0,       1.0, 1.0, 0.0, 1.0,
            ]);
            const FLOAT_SIZE = 4;
            gl.bindBuffer(gl.ARRAY_BUFFER, squareBufferRef);
            gl.bufferData(gl.ARRAY_BUFFER, squarePoints, gl.STATIC_DRAW);
            gl.vertexAttribPointer(vertexPosAttrRef, 2, gl.FLOAT, false, 6*FLOAT_SIZE, 0);
            gl.enableVertexAttribArray(vertexPosAttrRef);
            gl.vertexAttribPointer(vertexColorAttrRef, 4, gl.FLOAT, false, 6*FLOAT_SIZE, 2*FLOAT_SIZE);
            gl.enableVertexAttribArray(vertexColorAttrRef);
            return vao;
        })();

        gl.useProgram(program);

        gl.uniform1f(coeffUniformRef, 0.5);

        gl.clearColor(0.0, 0.4, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.bindVertexArray(squareVAO);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.bindVertexArray(triangleVAO);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

}