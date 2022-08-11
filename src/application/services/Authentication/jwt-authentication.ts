import { IAuthenticationService, IValidateResult } from "../../../interfaces/authentication-interfaces";
import { sign, verify } from 'jsonwebtoken';
import { User } from "../../../domain/entities/User";

interface Payload {
    sub: string
};

export class JWTAuthentication implements IAuthenticationService  {

    protected expiresIn: string;

    constructor(expiresIn: string){
        this.expiresIn = expiresIn
    };

    generate(user: User): string {
        const token = sign(
            {
                username: user.props.username,
                email: user.props.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: this.expiresIn
            }
        );

        return token;
    };

    validate(token: string): IValidateResult {
        
        try{
   
            const { sub } = verify(
                token,
                process.env.JWT_SECRET
            ) as Payload;

    
            return { isValid: true, user_id: sub };
        }catch(err){
            console.log(err)
            return { isValid: false, user_id: '' };
        };
    };
};