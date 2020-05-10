import {ShaderType, createProgram, loadShader} from '../utils';

import frg_display_glsl from './frg_display.glsl';
import frg_fire_glsl from './frg_fire.glsl';
import vtx_surface_glsl from './vtx_surface.glsl';
import test_texture from './monogatari.png';

export class Fire {

    render(gl: WebGL2RenderingContext): void {

        // Prepare shaders and programs
        const vtx_surface = loadShader(gl, ShaderType.vertex, vtx_surface_glsl);
        const frg_display = loadShader(gl, ShaderType.fragment, frg_display_glsl);
        const frg_fire = loadShader(gl, ShaderType.fragment, frg_display_glsl);
        const program_display = createProgram(gl, vtx_surface, frg_display);
        const program_fire = createProgram(gl, vtx_surface, frg_fire);

        const displayAttrVertexPositionRef = gl.getAttribLocation(program_display, "vertexPosition");
        const displayUniformTextureRef = gl.getUniformLocation(program_display, "toDisplay");
        const fireAttrVertexPositionRef = gl.getAttribLocation(program_fire, "vertexPosition");
        const fireUniformTextureRef = gl.getUniformLocation(program_fire, "previousFire");

        // Prepare drawing surface
        const surface_coords = new Float32Array([
            -1, -1,
            -1, 1,
            1, -1,
            1, 1,
        ]);
        const surfaceVAO = gl.createVertexArray();
        gl.bindVertexArray(surfaceVAO);
        const surfaceBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, surfaceBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, surface_coords, gl.STATIC_DRAW);
        gl.vertexAttribPointer( displayAttrVertexPositionRef, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray( displayAttrVertexPositionRef);

        // Create texture
        const image = new Image();
        image.src = test_texture;
        const texture = gl.createTexture();

        image.onload = () => {

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    
            gl.useProgram(program_display);
            gl.uniform1i(displayUniformTextureRef, 0);
    
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }


    }

}