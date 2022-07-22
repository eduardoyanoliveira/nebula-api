import { Request, Response } from "express";
import { IUserDataProps } from "../../../DTOs/User/interfaces";
import { IUserDTO } from "../../../DTOs/User/user-dto";
import { ListUsersService } from "./list-users-service";
import { objectToWhere } from '../../../../utils/prisma-filters';

export class ListUsersController{

    constructor(
        private ListUsersService: ListUsersService,
        private UserDTO: IUserDTO
    ){};

    async handle( req: Request, res: Response){
        
        const filters = objectToWhere(req.query);

        const usersOrError = await this.ListUsersService.execute({filters});

        if(usersOrError.isFailure){
            throw new Error(usersOrError.error);
        };

        const users : Omit<IUserDataProps, 'password'>[] = [];

        usersOrError.getValue().forEach((user) => {
            users.push(this.UserDTO.userToResponse(user));
        });

        return res.json(users);
    };
};