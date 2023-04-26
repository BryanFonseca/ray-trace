const EPSILON = 0.00001;

export function equal(x: number, y: number) {
    return Math.abs(x - y) < EPSILON;
}