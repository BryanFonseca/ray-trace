import { test, expect, describe } from "vitest";
import { Color } from "../colors";
import "../areTuplesEqual";

describe("Color related tests", () => {
    test("Colors are [red, green, blue] tuples", () => {
        const c = new Color(-0.5, 0.4, 1.7);
        expect(c.red).toBe(-0.5);
        expect(c.green).toBe(0.4);
        expect(c.blue).toBe(1.7);
    });

    test("Adding colors", () => {
        const c1 = new Color(0.9, 0.2, 0.75);
        const c2 = new Color(0.7, 0.1, 0.25);
        expect(c1.add(c2)).toEqual(new Color(1.6, 0.3, 1.0));
    });

    test("Subtracting colors", () => {
        const c1 = new Color(0.9, 0.6, 0.75);
        const c2 = new Color(0.7, 0.1, 0.25);
        expect(c1.subtract(c2)).toEqual(new Color(0.2, 0.5, 0.5));
    });

    test("Multiplying a color by a scalar", () => {
        const c1 = new Color(0.2, 0.3, 0.4);
        expect(c1.multiply(2)).toEqual(new Color(0.4, 0.6, 0.8));
    });

    test("Multiplying colors", () => {
        const c1 = new Color(1, 0.2, 0.4);
        const c2 = new Color(0.9, 1, 0.1);
        expect(c1.hadamardProduct(c2)).toEqual(new Color(0.9, 0.2, 0.04));
    });
});
