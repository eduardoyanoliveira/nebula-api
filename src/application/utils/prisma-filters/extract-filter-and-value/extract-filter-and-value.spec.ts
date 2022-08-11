import { extractFilterAndValue } from "./extract-filter-and-value";

describe('Extract filter and value func', () => {

    it('should fail with the src does not have a $ signs at the benning', () => {
        const src = 'OR$username';

        const response = extractFilterAndValue(src);

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('String is not following the pattern');

    });


    it('should fail with the src does not have two $ sign', () => {
        const src = '$ORusername';

        const response = extractFilterAndValue(src);

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('String is not following the pattern');

    });

    it('should fail with the src does not have substring between the two $ signs', () => {
        const src = '$$username';

        const response = extractFilterAndValue(src);

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('String is not following the pattern');

    });

    it('should fail with the src does not have substring after the last $ sign', () => {
        const src = '$OR$';

        const response = extractFilterAndValue(src);

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('String is not following the pattern');

    });

    it('should return an array with filter "OR" and value "username" ', () => {
        const src = '$OR$username';

        const filterAndValue = extractFilterAndValue(src).getValue();

        expect(filterAndValue.filter).toBe('OR');
        expect(filterAndValue.value).toBe('username');
    });

    it('should return an array with filter "AND" and value "created_at" ', () => {
        const src = '$AND$created_at';

        const filterAndValue = extractFilterAndValue(src).getValue();

        expect(filterAndValue.filter).toBe('AND');
        expect(filterAndValue.value).toBe('created_at');
    });

});