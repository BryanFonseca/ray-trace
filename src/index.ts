// import { equal } from "./helpers/equal";
import fs from 'fs/promises';
import { Canvas } from "./canvas";
import { Point, Tuple, Vector } from "./tuples";
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

interface Projectile {
    position: Point,
    velocity: Vector
}

interface Environment {
    gravity: Vector,
    wind: Vector
}

const environment = {
    gravity: new Vector(0, -0.1, 0),
    wind: new Vector(0.01, 0, 0)
};

function tick(environment: Environment, projectile: Projectile) {
    const position = projectile.position.add(projectile.velocity); // debe inferirse que se retornará un punto
    const velocity = projectile.velocity.add(environment.gravity).add(environment.wind); // debe inferirse que se retornará un vector
    return {
        position,
        velocity
    }
}

let projectile: Projectile = {
    position: new Point(0, 1, 0),
    velocity: (new Vector(1, 1, 0)).normalize()
};


function loop() {
    console.log(`X: ${projectile.position.x} Y: ${projectile.position.y}`);
    const timeoutId = setTimeout(() => {
        if (projectile.position.y <= 0) return;
        projectile = tick(environment, projectile);
        loop();
    }, 100);
}

// loop();
// const c = new Canvas(5, 3);
// console.log(c.toPPM());
// 
// fs.writeFile('./test.ppm', c.toPPM());