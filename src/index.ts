import {SimpleSquare} from './1_simple_square/simple_square';
import {generateWebGLCanvas} from './utils';



const simpleSquareContext = generateWebGLCanvas(window.innerWidth-20, 250);
const simpleSquare = new SimpleSquare();
simpleSquare.render(simpleSquareContext);