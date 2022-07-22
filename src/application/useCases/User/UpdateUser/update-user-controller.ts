import { Request, Response } from "express";
import { IUserDTO } from "../../../DTOs/User/user-dto";
import { UpdateUserService } from "./update-user-service";

export class UpdateUserController {

    constructor(
        private UpdateUserService: UpdateUserService,
        private UserDTO: IUserDTO
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;

        const { username, is_active } = req.body;

        const userOrError = await this.UpdateUserService.execute({
            id,
            username,
            is_active
        });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserDTO.userToResponse(userOrError.getValue()));
        
    };
};