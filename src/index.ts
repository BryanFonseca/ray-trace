// import { equal } from "./helpers/equal";
import fs from 'fs/promises';
import { Canvas } from "./canvas";
import { Point, Tuple, Vector } from "./tuples";
import { Color } from './colors';
import Matrix from './matrix';
// 
// const a = 0.3;
// const b = 0.1 + 0.2;
// console.log(a, b),
// console.log(equal(a, b));
// 
// const point = new Point(1, 2, 3);
// const vector = new Vector(1, 2, 3);
// const result = point.add(vector);
// console.log(result);

function identity<T>(arg: T): T {
    return arg;
}

const r = identity('hola');

// Chapter 1 experiment
// 
// interface Projectile {
//     position: Point,
//     velocity: Vector
// }
// 
// interface Environment {
//     gravity: Vector,
//     wind: Vector
// }
// 
// const environment = {
//     gravity: new Vector(0, -0.1, 0),
//     wind: new Vector(0.01, 0, 0)
// };
// 
// function tick(environment: Environment, projectile: Projectile) {
//     const position = projectile.position.add(projectile.velocity); // debe inferirse que se retornará un punto
//     const velocity = projectile.velocity.add(environment.gravity).add(environment.wind); // debe inferirse que se retornará un vector
//     return {
//         position,
//         velocity
//     }
// }
// 
// let projectile: Projectile = {
//     position: new Point(0, 1, 0),
//     velocity: (new Vector(1, 1, 0)).normalize()
// };
// 
// 
// function loop() {
//     console.log(`X: ${projectile.position.x} Y: ${projectile.position.y}`);
//     const timeoutId = setTimeout(() => {
//         if (projectile.position.y <= 0) return;
//         projectile = tick(environment, projectile);
//         loop();
//     }, 100);
// }
// 
// loop();

// Chapter 2 experiment
// interface Projectile {
//     position: Point,
//     velocity: Vector
// }
// 
// interface Environment {
//     gravity: Vector,
//     wind: Vector
// }
// 
// const environment = {
//     gravity: new Vector(0, -0.1, 0),
//     wind: new Vector(-0.01, 0, 0)
// };
// 
// let projectile: Projectile = {
//     position: new Point(0, 1, 0),
//     velocity: (new Vector(1, 1.8, 0)).normalize().multiply(11.25)
// };
// 
// function tick(environment: Environment, projectile: Projectile) {
//     const position = projectile.position.add(projectile.velocity); // debe inferirse que se retornará un punto
//     const velocity = projectile.velocity.add(environment.gravity).add(environment.wind); // debe inferirse que se retornará un vector
//     return {
//         position,
//         velocity
//     }
// }
// 
// const canvas = new Canvas(900, 550);
// 
// console.log(`X: ${projectile.position.x} Y: ${projectile.position.y}`);
// while (projectile.position.y > 0) {
//     projectile = tick(environment, projectile);
//     canvas.writePixel(Math.round(projectile.position.x), 550 - Math.round(projectile.position.y), new Color(1, 1, 1));
//     canvas.writePixel(Math.round(projectile.position.x), 550 - Math.round(projectile.position.y) - 1, new Color(1, 1, 1));
//     canvas.writePixel(Math.round(projectile.position.x) + 1, 550 - Math.round(projectile.position.y) - 1, new Color(1, 1, 1));
//     canvas.writePixel(Math.round(projectile.position.x) + 1, 550 - Math.round(projectile.position.y), new Color(1, 1, 1));
//     // console.log(`X: ${projectile.position.x} Y: ${projectile.position.y}`);
// }
// 
// fs.writeFile('./test.ppm', canvas.toPPM());

const m = new Matrix(
    [1, 2, 3],
    [1, 2, 3]
);

const a = Tuple.fromTuple(1, 2, 3, 0);;
console.log(a instanceof Point);
console.log(a instanceof Vector);
const b = Tuple.fromTuple(1, 2, 3, 1);
console.log(b instanceof Point);
console.log(b instanceof Vector);