import { equal } from "./helpers/equal";

export default class Matrix {
    matrix: number[][] = [];

    constructor(...rows: number[][]) {
        // check that all elements have at least one element
        const isEmpty = rows.every(row => row.length === 0);
        if (isEmpty) throw new Error('Empty matrix provided.');

        // check that all rows have the same length
        const haveSameLength = rows.reduce((prev, curr) => prev.length === curr.length ? curr : []).length > 0;
        if (!haveSameLength) throw new Error('Some rows of the matrix differ on their lengths.');

        this.matrix = rows;
    }

    equals(otherMatrix: Matrix) {
        let areEqual = true;
        for (let i = 0; i < this.matrix.length; i++) {
            const column = this.matrix[i];
            for (let j = 0; j < column.length; j++) {
                areEqual = areEqual && equal(column[j], otherMatrix.matrix[i][j])
            }
        }
        return areEqual;
    }

    multiply(otherMatrix: Matrix) {
        const rows: number[][] = [];
        for (let i = 0; i < this.matrix[0].length; i++) {
            const row: number[] = [];
            for (let j = 0; j < this.matrix.length; j++) {
                let result = 0;
                for (let w = 0; w < this.matrix.length; w++) {
                    result += this.matrix[i][w] * otherMatrix.matrix[w][j];
                }
                row.push(result);
            }
            rows.push(row);
        }
        return new Matrix(...rows);
    }
}