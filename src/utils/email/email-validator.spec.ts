import { EmailValidator } from "./email-validator";

const emailValidator = new EmailValidator();

describe('EmailValidator', () => { 
    it('should return false if the email string does not have a @ followed by a string', async () => {

        const response = await emailValidator.validate('test.com');

        expect(response).toBeFalsy();
    });

    it('should return false if the email string does not have a . followed by a string at its end', async () => {

        const response = await emailValidator.validate('test@test');

        expect(response).toBeFalsy();
    });

    it('should return false if the email string does not have a string at its start', async () => {

        const response = await emailValidator.validate('@test.com');

        expect(response).toBeFalsy();
    });

    it('should return true', async () => {

        const response = await emailValidator.validate('test@test.com');

        expect(response).toBeTruthy();
    });
});