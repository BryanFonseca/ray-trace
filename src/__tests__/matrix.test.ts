import { test, expect, describe } from "vitest";
import { Tuple } from "../tuples";
import Matrix from "../matrix";
import "../areFloatingPointNumbersEqual";

describe("Matrix tests", () => {
    test("Constructing and inspecting a 4x4 matrix", () => {
        const m = new Matrix(
            [1, 2, 3, 4],
            [5.5, 6.5, 7.5, 8.5],
            [9, 10, 11, 12],
            [13.5, 14.5, 15.5, 16.5]
        );
        // console.table(m.matrix);
        expect(m.matrix[0][0]).toEqual(1);
        expect(m.matrix[0][3]).toEqual(4);
        expect(m.matrix[1][0]).toEqual(5.5);
        expect(m.matrix[1][2]).toEqual(7.5);
        expect(m.matrix[2][2]).toEqual(11);
        expect(m.matrix[3][0]).toEqual(13.5);
        expect(m.matrix[3][2]).toEqual(15.5);
    });

    test("Constructing and inspecting a 2x2 matrix", () => {
        const m = new Matrix([-3, 5], [1, -2]);
        // console.table(m.matrix);
        expect(m.matrix[0][0]).toEqual(-3);
        expect(m.matrix[0][1]).toEqual(5);
        expect(m.matrix[1][0]).toEqual(1);
        expect(m.matrix[1][1]).toEqual(-2);
    });

    test("Constructing and inspecting a 3x3 matrix", () => {
        const m = new Matrix([-3, 5, 0], [1, -2, -7], [0, 1, 1]);
        // console.table(m.matrix);
        expect(m.matrix[0][0]).toEqual(-3);
        expect(m.matrix[1][1]).toEqual(-2);
        expect(m.matrix[2][2]).toEqual(1);
    });

    test("Matrix equality with identical matrices", () => {
        const A = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2]
        );
        const B = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2]
        );
        expect(A.equals(B)).toBe(true);
    });

    test("Matrix equality with differente matrices", () => {
        const A = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2]
        );
        const B = new Matrix(
            [2, 3, 4, 5],
            [6, 7, 8, 9],
            [9, 8, 7, 6],
            [5, 4, 3, 2]
        );
        expect(A.equals(B)).toBe(false);
    });

    test("Multiplying two matrices", () => {
        const A = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2]
        );
        const B = new Matrix(
            [-2, 1, 2, 3],
            [3, 2, 1, -1],
            [4, 3, 6, 5],
            [1, 2, 7, 8]
        );
        const result = new Matrix(
            [20, 22, 50, 48],
            [44, 54, 114, 108],
            [40, 58, 110, 102],
            [16, 26, 46, 42]
        );
        expect(A.multiply(B).equals(result)).toBe(true);
    });

    test("Multiplying a matrix by a tuple", () => {
        const A = new Matrix(
            [1, 2, 3, 4],
            [2, 4, 4, 2],
            [8, 6, 4, 1],
            [0, 0, 0, 1]
        );
        const B = Tuple.fromTuple(1, 2, 3, 1);
        const expectedResult = new Tuple(18, 24, 33, 1);
        expect(Tuple.areEqual(A.multiply(B), expectedResult)).toBe(true);
    });

    test("Multiplying a matrix by the identity matrix", () => {
        const A = new Matrix(
            [0, 1, 2, 4],
            [1, 2, 4, 8],
            [2, 4, 8, 16],
            [4, 8, 16, 32]
        );
        const identity = Matrix.identity();
        expect(A.multiply(identity).equals(A)).toBe(true);
    });

    test("Transposing a matrix", () => {
        const A = new Matrix(
            [0, 9, 3, 0],
            [9, 8, 0, 8],
            [1, 8, 5, 3],
            [0, 0, 5, 8]
        );
        const transposed = new Matrix(
            [0, 9, 1, 0],
            [9, 8, 8, 0],
            [3, 0, 5, 5],
            [0, 8, 3, 8]
        );
        expect(A.transpose().equals(transposed)).toBe(true);
    });

    test("Calculating the determinant of a 2x2 matrix", () => {
        const A = new Matrix([1, 5], [-3, 2]);
        expect(A.determinant()).toEqual(17);
    });

    test("A submatrix of a 3x3 matrix is a 2x2 matrix", () => {
        const A = new Matrix([1, 5, 0], [-3, 2, 7], [0, 6, -3]);
        const submatrix = new Matrix([-3, 2], [0, 6]);
        expect(A.submatrix(0, 2).equals(submatrix)).toBe(true);
    });

    test("A submatrix of a 4x4 matrix is a 3x3 matrix", () => {
        const A = new Matrix(
            [-6, 1, 1, 6],
            [-8, 5, 8, 6],
            [-1, 0, 8, 2],
            [-7, 1, -1, 1]
        );
        const submatrix = new Matrix([-6, 1, 6], [-8, 8, 6], [-7, -1, 1]);
        expect(A.submatrix(2, 1).equals(submatrix)).toBe(true);
    });

    test("Calculating a minor of a 3x3 matrix", () => {
        const A = new Matrix([3, 5, 0], [2, -1, -7], [6, -1, 5]);
        const B = A.submatrix(1, 0);
        expect(B.determinant()).toEqual(25);
        expect(A.minor(1, 0)).toBe(25);
    });

    test("Calculating a cofactor of a 3x3 matrix", () => {
        const A = new Matrix([3, 5, 0], [2, -1, -7], [6, -1, 5]);
        expect(A.minor(0, 0)).toBe(-12);
        expect(A.cofactor(0, 0)).toBe(-12);
        expect(A.minor(1, 0)).toBe(25);
        expect(A.cofactor(1, 0)).toBe(-25);
    });

    test("Calculating the determinant of a 3x3 matrix", () => {
        const A = new Matrix([1, 2, 6], [-5, 8, -4], [2, 6, 4]);
        expect(A.cofactor(0, 0)).toBe(56);
        expect(A.cofactor(0, 1)).toBe(12);
        expect(A.cofactor(0, 2)).toBe(-46);
        expect(A.determinant()).toBe(-196);
    });

    test("Calculating the determinant of a 4x4 matrix", () => {
        const A = new Matrix(
            [-2, -8, 3, 5],
            [-3, 1, 7, 3],
            [1, 2, -9, 6],
            [-6, 7, 7, -9]
        );
        expect(A.cofactor(0, 0)).toBe(690);
        expect(A.cofactor(0, 1)).toBe(447);
        expect(A.cofactor(0, 2)).toBe(210);
        expect(A.cofactor(0, 3)).toBe(51);
        expect(A.determinant()).toBe(-4071);
    });

    test("Testing an invertible matrix for invertibility", () => {
        const A = new Matrix(
            [6, 4, 4, 4],
            [5, 5, 7, 6],
            [4, -9, 3, -7],
            [9, 1, 7, -6]
        );
        expect(A.isInvertible).toEqual(true);
    });

    test("Testing a noninvertible matrix for invertibility", () => {
        const A = new Matrix(
            [-4, 2, -2, -3],
            [9, 6, 2, 6],
            [0, -5, 1, -5],
            [0, 0, 0, 0]
        );
        expect(A.isInvertible).toEqual(false);
    });

    test("Calculating the inverse of a matrix", () => {
        const A = new Matrix(
            [-5, 2, 6, -8],
            [1, -5, 1, 8],
            [7, 7, -6, -7],
            [1, -3, 7, 4]
        );

        const inverse = new Matrix(
            [0.21805, 0.45113, 0.2406, -0.04511],
            [-0.80827, -1.45677, -0.44361, 0.52068],
            [-0.07895, -0.22368, -0.05263, 0.19737],
            [-0.52256, -0.81391, -0.30075, 0.30639]
        );

        const B = A.inverse();

        expect(A.determinant()).toEqual(532);
        expect(A.cofactor(2, 3)).toEqual(-160);
        expect(B.matrix[3][2]).toEqual(-160 / 532);
        expect(A.cofactor(3, 2)).toEqual(105);
        expect(B.matrix[2][3]).toEqual(105 / 532);
        expect(B.matrix[2][3]).toEqual(105 / 532);
        expect(B.equals(inverse)).toBe(true);
    });

    // TODO: Add more tests for inversing

    test("Multiplying a product by its inverse", () => {
        const A = new Matrix(
            [3, -9, 7, 3],
            [3, -8, 2, -9],
            [-4, 4, 4, 1],
            [-6, 5, -1, 1]
        );

        const B = new Matrix(
            [8, 2, 2, 2],
            [3, -1, 7, 0],
            [7, 0, 5, 4],
            [6, -2, 0, 5]
        );

        const C = A.multiply(B); // C = A * B
        expect(C.multiply(B.inverse()).equals(A)).toBe(true);
    });
});
