import { likeNormalizer } from ".";

describe('Like normalizer func', () => {

    it('should fail with value string has no wildcard', ()=> {
        const value = 'test';
        const response = likeNormalizer(value);

        expect(response.isFailure).toBeTruthy();
    });

    it('should return a startsWith operation', ()=> {
        const value = '%test';
        const response = likeNormalizer(value);

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().hasOwnProperty('startsWith')).toBeTruthy();
    });

    it('should return a endsWith operation', ()=> {
        const value = 'test%';
        const response = likeNormalizer(value);

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().hasOwnProperty('endsWith')).toBeTruthy();
    });
   
    it('should return a contains operation', ()=> {
        const value = '%test%';
        const response = likeNormalizer(value);

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().hasOwnProperty('contains')).toBeTruthy();
    });

});