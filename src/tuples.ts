// Before rendering stuff, we need to be able to represent basic concepts
// such as position, direction and distance.
// A tuple is an ordered list of number which will be used to represent a point in space
// The renderer will use a left-handed coordinate system.

import { equal } from "./helpers/equal";

// [x, y, z, w] whereas w will be 1 for points and 0 for vectors.
// E.G. [4, -4, 3, 1] (a point) [-4, 4, -3, 0] (a vector)

export class Tuple {
    x: number;
    y: number;
    z: number;
    w: number;
    // type: string;

    static fromTuple(x: number, y: number, z: number, w: 1): Vector;
    static fromTuple(x: number, y: number, z: number, w: 0): Point;
    static fromTuple(x: number, y: number, z: number, w: number): Tuple | Vector | Point {
        if (w === 1) return new Point(x, y, z);
        if (w === 0) return new Vector(x, y, z);
        return new Tuple(x, y, z, w);
    }

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // TODO: refactor to use rest operator
    add(other: Tuple): Tuple | Vector | Point {
        // Si se suma un punto con un vector, se tiene un punto
        // Si se suma un vector con otro vector, se tiene un vector
        // Si se suma un punto con un punto, se tiene una tupla

        // Se suman contrarios, siempre se tiene un punto (w es 1 en uno de ellos)
        // Se suman iguales:
        //  puntos: neither (w en ambos es 1)
        //  vectores: vector (w en ambos es 0)
        const x = this.x + other.x;
        const y = this.y + other.y;
        const z = this.z + other.z;
        const w = this.w + other.w;

        if (w === 0) return new Vector(x, y, z);
        if (w === 1) return new Point(x, y, z);

        return new Tuple(x, y, z, w);
    }

    subtract(other: Tuple): Tuple {
        const x = this.x - other.x;
        const y = this.y - other.y;
        const z = this.z - other.z;
        const w = this.w - other.w;

        if (w === 0) return new Vector(x, y, z);
        if (w === 1) return new Point(x, y, z);

        return new Tuple(x, y, z, w);
    }

    negate() {
        return new Tuple(-this.x, -this.y, -this.z, -this.w);
    }

    multiply(scalar: number) {
        return new Tuple(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    }

    divide(scalar: number) {
        return this.multiply(1 / scalar);
    }

    static areEqual(a: Tuple, b: Tuple) {
        return (
            equal(a.x, b.x) &&
            equal(a.y, b.y) &&
            equal(a.z, b.z) &&
            equal(a.w, b.w)
        );
    }
}

export class Point extends Tuple {
    constructor(x: number, y: number, z: number) {
        super(x, y, z, 1);
    }

    add(vector: Vector): Point 
    add(point: Point): Tuple
    add(tuple: Point | Vector): Point | Vector {
        const added = super.add(tuple);
        if (added instanceof Point) {
            return new Tuple(added.x, added.y, added.z, added.w);
        } else if (added instanceof Vector) {
            return new Point(added.x, added.y, added.z);
        } else {
            throw new Error('Incompatible type');
        }
    }
}

export class Vector extends Tuple {
    constructor(x: number, y: number, z: number) {
        super(x, y, z, 0);
    }

    add(vector: Vector): Vector;
    add(point: Point): Point;
    add(tuple: Point | Vector): Point | Vector{
        const added = super.add(tuple);
        if (tuple instanceof Point) {
            return new Point(added.x, added.y, added.z);
        } else if (tuple instanceof Vector) {
            return new Vector(added.x, added.y, added.z);
        } else {
            throw new Error('Invalid type');
        }
    }

    multiply(scalar: number): Vector {
        const tupleResult = super.multiply(scalar);
        return new Vector(tupleResult.x, tupleResult.y, tupleResult.z);
    }

    // TODO: make this a getter
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    normalize() {
        return new Vector(
            this.x / this.magnitude(),
            this.y / this.magnitude(),
            this.z / this.magnitude()
        );
    }

    static dot(a: Vector, b: Vector) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static cross(a: Vector, b: Vector) {
        return new Vector(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }
}
