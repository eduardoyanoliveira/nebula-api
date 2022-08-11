import { removeUndefinedProps } from "./remove-undefined-props";

describe('Remove undefined props function', () => {

    it('should remove all undefined props from the object', ()=> {

        const testObj = {
            keyOne: 'valueOne',
            keyTwo: 'valueTwo',
            keyThree: ''
        };

        const response = removeUndefinedProps(testObj);

        expect(Object.keys(response).length).toBe(2);

    }); 

    it('should remove all undefined props from the object', ()=> {

        const testObj = {
            keyOne: 'valueOne',
            keyTwo: 'valueTwo',
            keyThree: 'valueThree',
            keyFour: ''
        };

        const response = removeUndefinedProps(testObj);

        expect(Object.keys(response).length).toBe(3);

    }); 

    it('should remove all undefined props from the object', ()=> {

        const testObj = {
            keyOne: 'valueOne',
            keyTwo: 'valueTwO',
            keyThree: undefined,
            keyFour: 'valueFour',
            keyFive: ''
        };

        const response = removeUndefinedProps(testObj);
        expect(Object.keys(response).length).toBe(3);

    }); 
});