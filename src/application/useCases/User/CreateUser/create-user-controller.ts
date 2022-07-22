import { Request, Response } from "express";
import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { IUserDTO } from "../../../DTOs/User/user-dto";
import { CreateUserService } from "./create-user-service";


export class CreateUserController{

    constructor(
        private CreateUserService: CreateUserService,
        private UserDTO: IUserDTO
    ){};

    async handle(req: Request, res: Response){
        const { 
            role,
            username,
            email,
            password, 
        } = req.body;

        const userOrError : Result<User> = await this.CreateUserService.execute({ 
            role,
            username, 
            email, 
            password 
        });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserDTO.userToResponse(userOrError.getValue()));
    };
};