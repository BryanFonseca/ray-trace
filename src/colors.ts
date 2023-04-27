import { Tuple } from "./tuples";

export class Color extends Tuple {
    constructor(red: number, green: number, blue: number) {
        super(red, green, blue, 0);
    }

    public get red() : number {
        return this.x;
    }

    public get green() : number {
        return this.y;
    }

    public get blue() : number {
        return this.z;
    }
    
    hadamardProduct(other: Color): Color {
        const r = this.red * other.red;
        const g = this.green * other.green;
        const b = this.blue * other.blue;
        return new Color(r, g, b);
    }
}