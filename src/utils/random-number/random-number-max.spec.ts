import { getRandomNumberMax } from "./random-number-max";

describe('Random number with a max number', () => {

    it('should generate a number between 0 and 3', () => {
        const number = getRandomNumberMax(3);
        expect(number).toBeLessThanOrEqual(3);
    });

    it('should generate a number between 0 and 5', () => {
        const number = getRandomNumberMax(5);
        expect(number).toBeLessThanOrEqual(5);
    });

    it('should generate a number between 0 and 7', () => {
        const number = getRandomNumberMax(7);
        expect(number).toBeLessThanOrEqual(7);
    });

    it('should generate a number between 0 and 10', () => {
        const number = getRandomNumberMax(10);
        expect(number).toBeLessThanOrEqual(10);
    });

    it('should generate a number between 0 and 100', () => {
        const number = getRandomNumberMax(100);
        expect(number).toBeLessThanOrEqual(100);
    });
})