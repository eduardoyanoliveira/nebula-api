import { Request, Response } from "express";
import { IUserDTO } from "../../../DTOs/User/user-dto";
import { GetUserService } from "./get-user-service";

export class GetUserController {

    constructor(
        private GetUserService : GetUserService,
        private UserDTO: IUserDTO
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;


        const userOrError = await this.GetUserService.execute({ user_id: id });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserDTO.userToResponse(userOrError.getValue()));
    };
};