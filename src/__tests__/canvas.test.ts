import { Canvas } from "../canvas";
import { Color } from "../colors";

describe('Canvas', () => {
    test('Creating a canvas', () => {
        const c = new Canvas(3, 2);
        expect(c.width).toBe(3);
        expect(c.height).toBe(2);

        const black = new Color(0, 0, 0);
        for (const column of c.pixels) {
            for (const pixel of column) {
                expect(pixel).toEqual(black);
            }
        }

        // c.pixels[0][1] = new Color(1, 1, 1);
        // console.log(c.pixels);
    });

    test('Writing pixels to a canvas', () => {
        const c = new Canvas(10, 20);
        const red = new Color(1, 0, 0);
        c.writePixel(2, 3, red);
        expect(c.pixelAt(2, 3)).toEqual(red);
        expect(c.pixels[2][3]).toEqual(red);
    });

    test('Constructing the PPM header', () => {
        const c = new Canvas(5, 3);
        const ppm = c.toPPM();
        // the headers corresponds to the first three lines
        const lines = ppm.split('\n').slice(0, 3);
        expect(lines).toEqual(
            [
                'P3',
                '5 3',
                '255',
            ]
        )
    });

    test('Constructing the PPM pixel data', () => {
        const c = new Canvas(5, 3);
        const c1 = new Color(1.5, 0, 0);
        const c2 = new Color(0, 0.5, 0);
        const c3 = new Color(-0.5, 0, 1);

        c.writePixel(0, 0, c1);
        c.writePixel(2, 1, c2);
        c.writePixel(4, 2, c3);

        const ppm = c.toPPM();
        const lines = ppm.split('\n').slice(3);
        console.log(lines);
        expect(lines).toEqual(
            [
                '255 0 0 0 0 0 0 0 0 0 0 0 0 0 0',
                '0 0 0 0 0 0 0 128 0 0 0 0 0 0 0',
                '0 0 0 0 0 0 0 0 0 0 0 0 0 0 255',
            ]
        )
    });

    test('Splitting long lines in PPM files', () => {
        const c = new Canvas(10, 2);
        const color = new Color(1, 0.8, 0.6);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 2; j++) {
                c.pixels[i][j] = color;
            }
        }
        const ppm = c.toPPM();
        const lines = ppm.split('\n').slice(3);
        expect(lines).toEqual(
            [
                '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204',
                '153 255 204 153 255 204 153 255 204 153 255 204 153',
                '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204',
                '153 255 204 153 255 204 153 255 204 153 255 204 153'
            ]
        )
    });
});

/*
(0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0), (0, 0, 0),
*/