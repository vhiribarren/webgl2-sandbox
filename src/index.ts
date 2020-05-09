import {SimpleSquare} from './1_simple_square/simple_square';
import {LineAndPoint} from './2_line_and_point/line_and_point';
import {ColoredSquare} from './3_colored_square/colored_square';
import {ComplexPrimitives} from './4_complex_primitives/complex_primitives';
import {generateWebGLCanvas} from './utils';


const demos = [SimpleSquare, LineAndPoint, ColoredSquare, ComplexPrimitives];

demos.forEach(Demo => {
    const demoContext = generateWebGLCanvas(window.innerWidth-20, 250);
    const demo = new Demo();
    demo.render(demoContext);
});