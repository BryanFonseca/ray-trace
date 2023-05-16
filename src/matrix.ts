import { equal } from "./helpers/equal";
import { Tuple } from "./tuples";

export default class Matrix {
    matrix: number[][] = [];

    constructor(...rows: number[][]) {
        // check that all elements have at least one element
        const isEmpty = rows.every((row) => row.length === 0);
        if (isEmpty) throw new Error("Empty matrix provided.");

        // check that all rows have the same length
        const haveSameLength =
            rows.reduce((prev, curr) =>
                prev.length === curr.length ? curr : []
            ).length > 0;
        if (!haveSameLength)
            throw new Error("Some rows of the matrix differ on their lengths.");

        this.matrix = rows;
    }

    equals(otherMatrix: Matrix) {
        let areEqual = true;
        for (let i = 0; i < this.matrix.length; i++) {
            const column = this.matrix[i];
            for (let j = 0; j < column.length; j++) {
                areEqual =
                    areEqual && equal(column[j], otherMatrix.matrix[i][j]);
            }
        }
        return areEqual;
    }

    multiply(someTuple: Tuple): Tuple;
    multiply(otherMatrix: Matrix): Matrix;
    multiply(otherMatrix: Matrix | Tuple): Matrix | Tuple {
        const multiplyingByTuple = otherMatrix instanceof Tuple;
        if (otherMatrix instanceof Tuple) {
            otherMatrix = new Matrix(
                [otherMatrix.x],
                [otherMatrix.y],
                [otherMatrix.z],
                [otherMatrix.w]
            );
        }
        const rows: number[][] = [];
        for (let i = 0; i < this.matrix[0].length; i++) {
            const row: number[] = [];
            for (let j = 0; j < otherMatrix.matrix[i].length; j++) {
                let result = 0;
                for (let w = 0; w < this.matrix.length; w++) {
                    result += this.matrix[i][w] * otherMatrix.matrix[w][j];
                }
                row.push(result);
            }
            rows.push(row);
        }
        if (multiplyingByTuple)
            return new Tuple(rows[0][0], rows[1][0], rows[2][0], rows[3][0]);
        return new Matrix(...rows);
    }

    transpose() {
        const rows: number[][] = [];
        for (let i = 0; i < this.matrix[0].length; i++) {
            const row: number[] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                row.push(this.matrix[j][i]);
            }
            rows.push(row);
        }
        return new Matrix(...rows);
    }

    determinant() {
        return (
            this.matrix[0][0] * this.matrix[1][1] -
            this.matrix[0][1] * this.matrix[1][0]
        );
    }

    submatrix(row: number, column: number) {
        return new Matrix();
    }

    /**
     * @returns 4x4 identity matrix
     */
    static identity() {
        return new Matrix(
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        );
    }
}
