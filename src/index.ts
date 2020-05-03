import frg_glsl from './fragment.glsl';
import vtx_glsl from './vertex.glsl';

const DEBUG = true;

enum ShaderType {
    vertex = WebGL2RenderingContext.VERTEX_SHADER,
    fragment = WebGL2RenderingContext.FRAGMENT_SHADER,
}

function loadShader(context: WebGL2RenderingContext, type: ShaderType, data: string): WebGLShader | null {
    const shaderRef = context.createShader(type);
    context.shaderSource(shaderRef, data);
    context.compileShader(shaderRef);
    if (!context.getShaderParameter(shaderRef, context.COMPILE_STATUS)) {
        const lastError = context.getError();
        const message = context.getShaderInfoLog(shaderRef);
        console.warn(`Error with shader of type: ${ShaderType[type]}, lastError: ${lastError}, message: ${message}`);
        // Not really needed, since it is automatically marked for deletion when the JS object is destroyed
        context.deleteShader(shaderRef);
        return null;
    }
    if (DEBUG) {
        const message = context.getShaderInfoLog(shaderRef);
        if (message) {
            console.debug(`ShaderInfoLog Compilation: ${message}`);
        }
    }
    return shaderRef;
}

function createProgram(context: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    const programRef = context.createProgram();
    context.attachShader(programRef, vertexShader);
    context.attachShader(programRef, fragmentShader);
    context.linkProgram(programRef);
    if (!context.getProgramParameter(programRef, context.LINK_STATUS)) {
        const lastError = context.getError();
        const message = context.getProgramInfoLog(programRef);
        console.warn(`Error with program, lastError: ${lastError}, message: ${message}`);
        // Not really needed, since it is automatically marked for deletion when the JS object is destroyed
        context.deleteProgram(programRef);
        return null;
    }
    if (DEBUG) {
        const linkMessage = context.getProgramInfoLog(programRef);
        if (linkMessage) {
            console.debug(`ProgramInfoLog Link: ${linkMessage}`);
        }
        context.validateProgram(programRef);
        const validateMessage = context.getProgramInfoLog(programRef);
        if (validateMessage) {
            console.debug(`ProgramInfoLog Validate: ${validateMessage}`);
        }
    }
    return programRef;
}



const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const gl = canvas.getContext("webgl2");
if (! gl) {
    console.warn("WebGL2 not available");
}

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