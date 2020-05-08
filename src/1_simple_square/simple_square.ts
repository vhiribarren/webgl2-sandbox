import {ShaderType, createProgram, loadShader} from '../utils';

import frg_glsl from './fragment.glsl';
import vtx_glsl from './vertex.glsl';


export class SimpleSquare {

    render(gl: WebGL2RenderingContext): void {

        // Shaders
        const vtx_shader = loadShader(gl, ShaderType.vertex, vtx_glsl);
        const frg_shader = loadShader(gl, ShaderType.fragment, frg_glsl);
        const program = createProgram(gl, vtx_shader, frg_shader);

        // Uniforms and attributes
        const coeffUniformRef = gl.getUniformLocation(program, "coefficient");
        const vertexAttrRef = gl.getAttribLocation(program, "vertexPosition");

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

        gl.vertexAttribPointer(vertexAttrRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexAttrRef);

        gl.useProgram(program);

        gl.uniform1f(coeffUniformRef, 0.5);

        gl.clearColor(0.0, 0.4, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squarePoints.length / 2);
    }

}