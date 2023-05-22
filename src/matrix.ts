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
        if (this.matrix.length === 2 && this.matrix[0].length === 2) {
            return (
                this.matrix[0][0] * this.matrix[1][1] -
                this.matrix[0][1] * this.matrix[1][0]
            );
        }
        if (this.matrix.length > 2 && this.matrix[0].length > 2) {
            let determinant = 0;
            for (let i = 0; i < this.matrix[0].length; i++) {
                determinant += this.matrix[0][i] * this.cofactor(0, i);
            }
            return determinant;
        }
        throw new Error("No square matrix provided");
    }

    /**
     * Removes the specified row and column from the current matrix.
     * @param row
     * @param column
     * @returns
     */
    submatrix(rowNumber: number, columnNumber: number) {
        const rows: number[][] = [];
        for (let i = 0; i < this.matrix.length; i++) {
            if (i === rowNumber) continue;
            const row: number[] = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (j === columnNumber) continue;
                row.push(this.matrix[i][j]);
            }
            rows.push(row);
        }

        const subMatrix = new Matrix(...rows);

        return subMatrix;
    }

    getRow(rowNumber: number) {
        return this.matrix[rowNumber];
    }

    getColumn(columnNumber: number) {
        const selectedColumn: number[] = [];
        for (let i = 0; i < this.matrix.length; i++) {
            selectedColumn.push(this.matrix[i][columnNumber]);
        }
        return selectedColumn;
    }

    minor(rowNumber: number, columnNumber: number) {
        return this.submatrix(rowNumber, columnNumber).determinant();
    }

    cofactor(rowNumber: number, columnNumber: number) {
        const minor = this.minor(rowNumber, columnNumber);
        if ((rowNumber + columnNumber) % 2 === 0) return minor;
        return -minor;
    }

    public get isInvertible(): boolean {
        return this.determinant() !== 0;
    }

    /**
     * Performs a deep copy of the matrix.
     * @returns 
     */
    copy() {
        const rows: number[][] = [];
        for (const row of this.matrix) {
            rows.push([...row]);
        }
        return new Matrix(...rows);
    }

    inverse() {
        const cofactorsMatrix = this.copy();
        for (let i = 0; i < cofactorsMatrix.matrix.length; i++) {
            for (let j = 0; j < cofactorsMatrix.matrix[i].length; j++) {
                cofactorsMatrix.matrix[i][j] = this.cofactor(i, j);
            }
        }
        const transposed = cofactorsMatrix.transpose();
        for (let i = 0; i < cofactorsMatrix.matrix.length; i++) {
            for (let j = 0; j < cofactorsMatrix.matrix[i].length; j++) {
                transposed.matrix[i][j] /= this.determinant();
            }
        }
        // console.table(transposed.matrix);
        return transposed;
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
