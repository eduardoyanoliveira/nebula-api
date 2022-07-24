import { Request, Response } from "express";
import { IUserToResponse } from "../../../DTOs/User/user-to-response";
import { GetUserService } from "./get-user-service";

export class GetUserController {

    constructor(
        private GetUserService : GetUserService,
        private UserToResponse: IUserToResponse
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;


        const userOrError = await this.GetUserService.execute({ user_id: id });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserToResponse.transform(userOrError.getValue()));
    };
};