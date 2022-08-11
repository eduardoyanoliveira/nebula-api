import { partialUpdateObject } from "./partial-update-object";

describe('partial update object', ()=> {

    it('should be able to update the object with the values from other object', () => {
        
        const obj = {
            keyOne: 'valueOne',
            keyTwo: 'valueTwo',
        };

        const updateValues = {
            keyOne: 'other_value'
        };

        const response = partialUpdateObject(obj, updateValues);

        expect(response['keyOne']).toBe('other_value');

    });
    

    it('should be able to update the object with the values from other object', () => {
        
        const obj = {
            keyOne: 'valueOne',
            keyTwo: 'valueTwo',
            keyThree: 'valueThree'
        };

        const updateValues = {
            keyOne: 'other_value',
            keyTwo: 'value_two',
        };

        const response = partialUpdateObject(obj, updateValues);

        expect(response['keyOne']).toBe('other_value');
        expect(response['keyTwo']).toBe('value_two');

    });


    it('should be able to update the object with the values from other object', () => {
        
        const obj = {
            keyOne: 'valueOne',
            keyTwo: 'valueTwo',
        };

        const updateValues = {
            keyTwo: 'other_value'
        };

        const response = partialUpdateObject(obj, updateValues);

        expect(response['keyTwo']).toBe('other_value');

    });
});