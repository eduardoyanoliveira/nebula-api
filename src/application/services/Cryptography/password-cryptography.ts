import { hash, compare } from "bcrypt";
import { IPasswordCryptographer } from "../../domain/interfaces/password-interfaces";

export class PasswordCryptographer implements IPasswordCryptographer{
    async crypt(password : string) : Promise<string>{
        return await hash(password, 8);
    };

    async compare(password: string, cryptographedPassword: string): Promise<boolean> {
        return await compare(password, cryptographedPassword);
    };
};
