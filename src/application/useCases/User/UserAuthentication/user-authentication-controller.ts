import { Request, Response } from "express";
import { UserAuthenticationService } from "./user-authentication-service";

export class UserAuthenticationController {

    constructor(
        private UserAuthenticationService: UserAuthenticationService,
    ){};

    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const userCredentialsOrError = await this.UserAuthenticationService.execute({
            email,
            password
        });

        if(userCredentialsOrError.isFailure){
            throw new Error(userCredentialsOrError.error);
        };

        const credentials = userCredentialsOrError.getValue();

        return res.json(credentials);
    };
};