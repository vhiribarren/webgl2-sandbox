import {SimpleSquare} from './1_simple_square/simple_square';
import {LineAndPoint} from './2_line_and_point/line_and_point';
import {ColoredSquare} from './3_colored_square/colored_square';
import {ComplexPrimitives} from './4_complex_primitives/complex_primitives';
import {generateWebGLCanvas} from './utils';



const simpleSquareContext = generateWebGLCanvas(window.innerWidth-20, 250);
const simpleSquare = new SimpleSquare();
simpleSquare.render(simpleSquareContext);

const simpleLineContext = generateWebGLCanvas(window.innerWidth-20, 250);
const simpleLine = new LineAndPoint();
simpleLine.render(simpleLineContext);

const coloredSquareContext = generateWebGLCanvas(window.innerWidth-20, 250);
const coloredSquare = new ColoredSquare();
coloredSquare.render(coloredSquareContext);

const complexPrimitivesContext = generateWebGLCanvas(window.innerWidth-20, 250);
const complexPrimitives = new ComplexPrimitives();
complexPrimitives.render(complexPrimitivesContext);