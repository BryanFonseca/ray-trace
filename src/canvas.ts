import { Color } from "./colors";

export class Canvas {
    width: number;
    height: number;
    pixels: Color[][] = [];

    constructor(width: number, height: number) {
        this.width = width; // number of columns
        this.height = height; // number of rows

        this.pixels = new Array(width)
            .fill(0)
            .map(() => new Array(height).fill(new Color(0, 0, 0)));
    }

    writePixel(x: number, y: number, color: Color) {
        // Maybe check bounds
        this.pixels[x][y] = color;
    }

    pixelAt(x: number, y: number): Color {
        return this.pixels[x][y];
    }

    // First three lines are the header
    toPPM() {
        const header = [
            `P3`,
            `${this.width} ${this.height}`,
            `255`,
        ];

        const pixelData: string[] = [];
        for (let j = 0; j < this.height; j++) {
            const line: string[] = [];
            for (let i = 0; i < this.width; i++) {
                const pixel = this.pixels[i][j];
                line.push(this.formatPixel(pixel.red, pixel.green, pixel.blue))
            }
            pixelData.push(line.join(' '));
        }

        return header.join('\n') + '\n' + pixelData.join('\n');
    }

    formatPixel(red: number, green: number, blue: number) {
        const formatedR = Math.round(this.clamp(red * 255, 0, 255));
        const formatedG = Math.round(this.clamp(green * 255, 0, 255));
        const formatedB = Math.round(this.clamp(blue * 255, 0, 255));
        return `${formatedR} ${formatedG} ${formatedB}`;
    }

    clamp(x: number, min: number, max: number) {
        if (x > max) return max;
        if (x < min) return min;
        return x;
    }
}

/*
5 x 3
[
    [c, c, c],
    [c, c, c],
    [c, c, c],
    [c, c, c],
    [c, c, c],
] length = width
*/
