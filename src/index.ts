import {SimpleSquare} from './1_simple_square/simple_square';


const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const gl = canvas.getContext("webgl2");
if (!gl) {
    console.warn("WebGL2 not available");
}

const simpleSquare = new SimpleSquare();
simpleSquare.render(gl);