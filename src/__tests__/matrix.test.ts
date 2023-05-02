import Matrix from "../matrix";
import '../areFloatingPointNumbersEqual';

describe('Matrix tests', () => {
    test('Constructing and inspecting a 4x4 matrix', () => {
        const m = new Matrix(
            [1, 2, 3, 4],
            [5.5, 6.5, 7.5, 8.5],
            [9, 10, 11, 12],
            [13.5, 14.5, 15.5, 16.5]
        );
        console.table(m.matrix);
        expect(m.matrix[0][0]).toEqual(1);
        expect(m.matrix[0][3]).toEqual(4);
        expect(m.matrix[1][0]).toEqual(5.5);
        expect(m.matrix[1][2]).toEqual(7.5);
        expect(m.matrix[2][2]).toEqual(11);
        expect(m.matrix[3][0]).toEqual(13.5);
        expect(m.matrix[3][2]).toEqual(15.5);
    });

    test('Constructing and inspecting a 2x2 matrix', () => {
        const m = new Matrix(
            [-3, 5],
            [1, -2]
        );
        console.table(m.matrix);
        expect(m.matrix[0][0]).toEqual(-3);
        expect(m.matrix[0][1]).toEqual(5);
        expect(m.matrix[1][0]).toEqual(1);
        expect(m.matrix[1][1]).toEqual(-2);
    });

    test('Constructing and inspecting a 3x3 matrix', () => {
        const m = new Matrix(
            [-3, 5, 0],
            [1, -2, -7],
            [0, 1, 1],
        );
        console.table(m.matrix);
        expect(m.matrix[0][0]).toEqual(-3);
        expect(m.matrix[1][1]).toEqual(-2);
        expect(m.matrix[2][2]).toEqual(1);
    });

    test('Matrix equality with identical matrices', () => {
        const A = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2],
        );
        const B = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2],
        );
        expect(A.equals(B)).toBe(true);
    });

    test('Matrix equality with differente matrices', () => {
        const A = new Matrix(
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 8, 7, 6],
            [5, 4, 3, 2],
        );
        const B = new Matrix(
            [2, 3, 4, 5],
            [6, 7, 8, 9],
            [9, 8, 7, 6],
            [5, 4, 3, 2],
        );
        expect(A.equals(B)).toBe(false);
    });
});