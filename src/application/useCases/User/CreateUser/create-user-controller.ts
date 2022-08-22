import { Request, Response } from "express";
import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { IUserToResponse } from "../../../DTOs/User/user-to-response";
import { CreateUserService } from "./create-user-service";


export class CreateUserController{

    constructor(
        private CreateUserService: CreateUserService,
        private UserToResponse: IUserToResponse
    ){};

    async handle(req: Request, res: Response){
        const { 
            role,
            username,
            email,
            password, 
        } = req.body;

        let photo = '';

        if(req.file){
            const { originalname, filename}  = req.file;
            photo = filename;
        };

        const userOrError : Result<User> = await this.CreateUserService.execute({ 
            role,
            username, 
            email, 
            password,
            photo
        });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserToResponse.transform(userOrError.getValue()));
    };
};