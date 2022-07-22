import { PasswordValidator } from "./password-validator";

const passwordValidator = new PasswordValidator();

describe('PasswordValidator', () => {
    it('should return false if the password does not have at least a uppercase letter', async () => {
        
        const validatedPassword = await passwordValidator.validate('@t12048');

        expect(validatedPassword).toBeFalsy();
    });

    it('should return false if the password does not have at least a lowercase letter', async () => {
        
        const validatedPassword = await passwordValidator.validate('@T12048');

        expect(validatedPassword).toBeFalsy();
    });

    it('should return false if the password does not have at least a number', async () => {
        
        const validatedPassword = await passwordValidator.validate('@Tests');

        expect(validatedPassword).toBeFalsy();
    });

    it('should return false if the password does not have at least a special character', async () => {
        
        const validatedPassword = await passwordValidator.validate('123Tests');

        expect(validatedPassword).toBeFalsy();
    });

    it('should return false if the password does not have at least six characters', async () => {
        
        const validatedPassword = await passwordValidator.validate('1@Ts');

        expect(validatedPassword).toBeFalsy();
    });

    it('should return true', async () => {
        
        const validatedPassword = await passwordValidator.validate('S@tst2');

        expect(validatedPassword).toBeTruthy();
    });
});