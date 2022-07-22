import { booleanNormalizer } from ".";

describe('Boolean normalizer func', () => {

    it('should return true', () => {
        const response = booleanNormalizer('true');

        expect(response.getValue()).toBeTruthy();
    });

    it('should return false', () => {
        const response = booleanNormalizer('false');

        expect(response.getValue()).toBeFalsy();
    });
});