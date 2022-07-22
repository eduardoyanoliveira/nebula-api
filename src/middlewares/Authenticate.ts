import { Request, Response, NextFunction } from "express";
import { JWTAuthentication } from "../application/services/Authentication/jwt-authentication";
import { IAuthenticationService } from '../interfaces/authentication-interfaces';

export class JWTAuthenticate {
    constructor(
        private AuthenticationService: IAuthenticationService
    ){};

    authenticate(req: Request, res: Response, next: NextFunction){
        const authToken = req.headers.authorization;

        if(!authToken){
            return res.status(401).end();
        };
        
        const [, token] = authToken.split(' ');

        // Validates the token
    
        const { isValid, user_id } = this.AuthenticationService.validate(token);

        if(!isValid){
            return res.status(401).end();
        };

        req.user_id = user_id;

        return next();
    };
};

const authenticationService = new JWTAuthentication('30d');
const jwtAuthenticate = new JWTAuthenticate(authenticationService);


export { jwtAuthenticate };
