import { test, expect, describe } from "vitest";
import { Tuple, Point, Vector } from "../tuples";
import "../areTuplesEqual";

describe("Tuples/Points/Vectors creation", () => {
    test("A tuple with w=1.0 is a point", () => {
        const a = Tuple.fromTuple(4.3, -4.2, 3.1, 1.0);
        expect(a.x).toBe(4.3);
        expect(a.y).toBe(-4.2);
        expect(a.z).toBe(3.1);
        expect(a.w).toBe(1.0);
        expect(a instanceof Point).toBe(true);
        expect(a instanceof Vector).toBe(false);
    });

    test("A tuple with w=0 is a vector", () => {
        const a = Tuple.fromTuple(4.3, -4.2, 3.1, 0.0);
        expect(a.x).toBe(4.3);
        expect(a.y).toBe(-4.2);
        expect(a.z).toBe(3.1);
        expect(a.w).toBe(0.0);
        expect(a instanceof Point).toBe(false);
        expect(a instanceof Vector).toBe(true);
    });

    test("Point creates tuples with w=1", () => {
        const a = new Point(4.3, -4.2, 3.1);
        const t = new Tuple(4.3, -4.2, 3.1, 1);
        expect(a.x).toBe(t.x);
        expect(a.y).toBe(t.y);
        expect(a.z).toBe(t.z);
        expect(a.w).toBe(t.w);
    });

    test("Vector creates tuples with w=0", () => {
        const a = new Vector(4.3, -4.2, 3.1);
        const t = new Tuple(4.3, -4.2, 3.1, 0);
        expect(a.x).toBe(t.x);
        expect(a.y).toBe(t.y);
        expect(a.z).toBe(t.z);
        expect(a.w).toBe(t.w);
    });
});

describe("Tuples operations", () => {
    test("Adding two tuples", () => {
        const a1 = new Tuple(3, -2, 0.1, 1);
        const a2 = new Tuple(-2, 3, 0.2, 0);
        const sum = a1.add(a2);
        // Using custom equality tester
        expect(sum).toEqual(new Tuple(1, 1, 0.3, 1));
    });

    test("Subtracting two points", () => {
        const a1 = new Point(3, 2, 1);
        const a2 = new Point(5, 6, 7);
        const subtraction = a1.subtract(a2);
        // Using custom equality tester
        expect(subtraction).toEqual(new Vector(-2, -4, -6));
    });

    test("Subtracting a vector from a point", () => {
        const p = new Point(3, 2, 1);
        const v = new Vector(5, 6, 7);
        const subtraction = p.subtract(v);
        // Using custom equality tester
        expect(subtraction).toEqual(new Point(-2, -4, -6));
    });

    test("Subtracting two vectors", () => {
        const p = new Vector(3, 2, 1);
        const v = new Vector(5, 6, 7);
        const subtraction = p.subtract(v);
        // Using custom equality tester
        expect(subtraction).toEqual(new Vector(-2, -4, -6));
    });

    // This is conceptually what negating a tuple represents
    test("Subtracting a vector from the zero vector", () => {
        const zero = new Vector(0, 0, 0);
        const v = new Vector(1, -2, 3);
        const subtraction = zero.subtract(v);
        // Using custom equality tester
        expect(subtraction).toEqual(new Vector(-1, 2, -3));
    });

    test("Negating a tuple", () => {
        const a = new Tuple(1, -2, 3, -4);
        const negativeA = new Tuple(-1, 2, -3, 4);
        expect(a.negate()).toEqual(negativeA);
    });

    test("Multiplying a tuple by a scalar", () => {
        const a = new Tuple(1, -2, 3, -4);
        const multiplication = a.multiply(3.5);
        expect(multiplication).toEqual(new Tuple(3.5, -7, 10.5, -14));
    });

    test("Multiplying a tuple by a fraction", () => {
        const a = new Tuple(1, -2, 3, -4);
        const multiplication = a.multiply(0.5);
        expect(multiplication).toEqual(new Tuple(0.5, -1, 1.5, -2));
    });

    test("Dividing a tuple by a scalar", () => {
        const a = new Tuple(1, -2, 3, -4);
        const division = a.divide(2);
        expect(division).toEqual(new Tuple(0.5, -1, 1.5, -2));
    });
});

describe("Vectors operations", () => {
    test("Computing the magnitude of vector(1, 0, 0)", () => {
        const v = new Vector(1, 0, 0);
        const magnitude = v.magnitude();
        expect(magnitude).toBe(1);
    });

    test("Computing the magnitude of vector(0, 1, 0)", () => {
        const v = new Vector(0, 1, 0);
        const magnitude = v.magnitude();
        expect(magnitude).toBe(1);
    });

    test("Computing the magnitude of vector(0, 0, 1)", () => {
        const v = new Vector(0, 0, 1);
        const magnitude = v.magnitude();
        expect(magnitude).toBe(1);
    });

    test("Computing the magnitude of vector(1, 2, 3)", () => {
        const v = new Vector(1, 2, 3);
        const magnitude = v.magnitude();
        expect(magnitude).toBe(Math.sqrt(14));
    });

    test("Computing the magnitude of vector(-1, -2, -3)", () => {
        const v = new Vector(-1, -2, -3);
        const magnitude = v.magnitude();
        expect(magnitude).toBe(Math.sqrt(14));
    });

    test("Normalizing vector(4, 0, 0) gives (1, 0, 0)", () => {
        const v = new Vector(4, 0, 0);
        expect(v.normalize()).toEqual(new Vector(1, 0, 0));
    });

    test("Normalizing vector(1, 2, 3) gives (1, 0, 0)", () => {
        const v = new Vector(1, 2, 3);
        expect(v.normalize()).toEqual(
            new Vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
        );
    });

    test("The magnitude of a normalized vector", () => {
        const v = new Vector(-1, -2, -3);
        const magnitude = v.normalize().magnitude();
        expect(magnitude).toBe(1);
    });

    test("The dot product of two vectors", () => {
        const a = new Vector(1, 2, 3);
        const b = new Vector(2, 3, 4);
        expect(Vector.dot(a, b)).toBe(20);
    });

    test("The cross product of two vectors", () => {
        const a = new Vector(1, 2, 3);
        const b = new Vector(2, 3, 4);
        expect(Vector.cross(a, b)).toEqual(new Vector(-1, 2, -1));
        expect(Vector.cross(b, a)).toEqual(new Vector(1, -2, 1));
    });
});
