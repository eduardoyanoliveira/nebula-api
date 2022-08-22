import { Request, Response } from "express";
import { IUserToResponse } from "../../../DTOs/User/user-to-response";
import { UpdateUserService } from "./update-user-service";

export class UpdateUserController {

    constructor(
        private UpdateUserService: UpdateUserService,
        private UserToResponse: IUserToResponse
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;

        const { username, is_active } = req.body;

        let photo = '';

        if(req.file){
            const { originalname, filename}  = req.file;
            photo = filename;
        };

        const userOrError = await this.UpdateUserService.execute({
            id,
            username,
            photo,
            is_active
        });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserToResponse.transform(userOrError.getValue()));
        
    };
};