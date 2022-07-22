import { IEmailValidator } from "../../interfaces/email-interfaces";

export class EmailValidator implements IEmailValidator{
    async validate(email: string) : Promise<boolean>{

        if(/\S+@\S+\.\S+/.test(email)){
            return true;
        };

        return false;
    };
};