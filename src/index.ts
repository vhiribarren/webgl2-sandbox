import {SimpleSquare} from './1_simple_square/simple_square';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth-20;;
canvas.height = 500;
document.body.appendChild(canvas);

const gl = canvas.getContext("webgl2");
if (!gl) {
    console.warn("WebGL2 not available");
}

// Width as variable size, while height is constant for image
gl.viewport((canvas.width - canvas.height)/2, 0, canvas.height, canvas.height);

const simpleSquare = new SimpleSquare();
simpleSquare.render(gl);