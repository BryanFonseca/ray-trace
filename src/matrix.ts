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
}