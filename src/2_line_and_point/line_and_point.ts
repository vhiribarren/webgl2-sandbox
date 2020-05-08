import {ShaderType, createProgram, loadShader} from '../utils';

import frg_glsl from './fragment.glsl';
import vtx_glsl from './vertex.glsl';


export class LineAndPoint {

    render(gl: WebGL2RenderingContext): void {

        // Shaders
        const vtx_shader = loadShader(gl, ShaderType.vertex, vtx_glsl);
        const frg_shader = loadShader(gl, ShaderType.fragment, frg_glsl);
        const program = createProgram(gl, vtx_shader, frg_shader);

        // Uniforms and attributes
        const coeffUniformRef = gl.getUniformLocation(program, "coefficient");
        const vertexAttrRef = gl.getAttribLocation(program, "vertexPosition");

        // Common value and drawing
        gl.useProgram(program);
        gl.uniform1f(coeffUniformRef, 0.5);

        gl.clearColor(0.0, 0.4, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        console.log(`Valide ranges for line width: ${gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)}`);
        console.log(`Valide ranges for point width: ${gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)}`);
        gl.lineWidth(1);

        // Lines
        const lineBufferRef = gl.createBuffer();
        const linePoints = new Float32Array([
            -1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0,
            1.0, -1.0
        ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, lineBufferRef);
        gl.bufferData(gl.ARRAY_BUFFER, linePoints, gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexAttrRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexAttrRef);

        gl.drawArrays(gl.LINE_LOOP, 0, linePoints.length/2);

        // Point
        const pointBufferRef = gl.createBuffer();
        const pointPoints  = new Float32Array([0.0, 0.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, pointBufferRef);
        gl.bufferData(gl.ARRAY_BUFFER, pointPoints, gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexAttrRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexAttrRef);

        gl.drawArrays(gl.POINTS, 0, pointPoints.length/2);

    }

}