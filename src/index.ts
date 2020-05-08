import {SimpleSquare} from './1_simple_square/simple_square';
import {LineAndPoint} from './2_line_and_point/line_and_point';
import {generateWebGLCanvas} from './utils';



const simpleSquareContext = generateWebGLCanvas(window.innerWidth-20, 250);
const simpleSquare = new SimpleSquare();
simpleSquare.render(simpleSquareContext);

const simpleLineContext = generateWebGLCanvas(window.innerWidth-20, 250);
const simpleLine = new LineAndPoint();
simpleLine.render(simpleLineContext);