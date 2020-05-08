const DEBUG = true;


export enum ShaderType {
    vertex = WebGL2RenderingContext.VERTEX_SHADER,
        fragment = WebGL2RenderingContext.FRAGMENT_SHADER,
}


export function loadShader(context: WebGL2RenderingContext, type: ShaderType, data: string): WebGLShader | null {
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


export function createProgram(context: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
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


export function generateWebGLCanvas(width: number, height: number): WebGL2RenderingContext | null {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.warn("WebGL2 not available");
        return null;
    }
    // Width as variable size, while height is constant for image
    gl.viewport((canvas.width - canvas.height)/2, 0, canvas.height, canvas.height);
    return gl;
}