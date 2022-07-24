import { Request, Response } from "express";
import { IUserDataProps } from "../../../DTOs/User/interfaces";
import { ListUsersService } from "./list-users-service";
import { objectToWhere } from '../../../../utils/prisma-filters';
import { IUserToResponse } from "../../../DTOs/User/user-to-response";

export class ListUsersController{

    constructor(
        private ListUsersService: ListUsersService,
        private UserToResponse: IUserToResponse
    ){};

    async handle( req: Request, res: Response){
        
        const filters = objectToWhere(req.query);

        const usersOrError = await this.ListUsersService.execute({filters});

        if(usersOrError.isFailure){
            throw new Error(usersOrError.error);
        };

        const users : Omit<IUserDataProps, 'password'>[] = [];

        usersOrError.getValue().forEach((user) => {
            users.push(this.UserToResponse.transform(user));
        });

        return res.json(users);
    };
};