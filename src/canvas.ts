import { Color } from "./colors";

function replaceCharAt(str: string, index: number, newChar: string) {
    if (index < 0 || index >= str.length) {
        return str;
    }
    return str.substring(0, index) + newChar + str.substring(index + 1);
}

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
        if (x > this.width || y > this.height) return;
        this.pixels[x][y] = color;
    }

    pixelAt(x: number, y: number): Color {
        return this.pixels[x][y];
    }

    // TODO: abstract away some of this logic
    toPPM() {
        // First three lines are the header
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

        const splittedLines: string[] = [];
        for (const line of pixelData) {
            let offset = 0;
            let newString = line;
            while (offset + 70 < line.length) {
                let oldOffset = offset;
                for (let i = offset; i < oldOffset + 70; i++) {
                    if (line[i] === ' ' && i <= oldOffset + 70) {
                        offset = i;
                    }
                }
                newString = replaceCharAt(newString, offset, '\n');
            }
            splittedLines.push(newString);
        }
        return header.join('\n') + '\n' + splittedLines.join('\n') + '\n';
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
