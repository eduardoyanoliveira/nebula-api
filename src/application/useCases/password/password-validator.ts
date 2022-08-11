import { IPasswordValidator } from "../../domain/interfaces/password-interfaces";

export class PasswordValidator implements IPasswordValidator {

    pattern : string = `Password Must have: \n
        A capital letter, a lowercase letter, a number. \n
        One special character and at least 6 characters.
    ` 

    async validate(password: string) : Promise<boolean>{

        if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{6,}$/.test(password)){
            return true
        };
     
        return false;
    };
};
