import { Request, Response } from "express";
import { IUserToResponse } from "../../../DTOs/User/user-to-response";
import { FindUserByIdService } from "./find-user-by-id-service";

export class FindUserByIdController {

    constructor(
        private FindUserByIdService : FindUserByIdService,
        private UserToResponse: IUserToResponse
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;


        const userOrError = await this.FindUserByIdService.execute({ userId: id });

        if(userOrError.isFailure){
            throw new Error(userOrError.error);
        };

        return res.json(this.UserToResponse.transform(userOrError.getValue()));
    };
};