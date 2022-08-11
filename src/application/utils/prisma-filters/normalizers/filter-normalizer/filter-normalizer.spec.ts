import { filterNormalizer } from ".";

describe('Filter normalizer func', () => {

    it('should fail with the value has no filter', () => {

        const response = filterNormalizer('test');

        expect(response.isFailure).toBeTruthy();

    });

    it('should be able to return an object in prisma filter basic format', () => {

        const response = filterNormalizer('$gt$test');

        expect(response.isSuccess).toBeTruthy();

    });
});