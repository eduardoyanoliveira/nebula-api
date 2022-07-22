import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IUserRepository } from "../../repositories/User/user-repository";
import { IUserDTO } from "../../DTOs/User/user-dto";

export interface IListUsers extends Pick<IUserRepository, 'list'>{};

export class ListUsers implements IListUsers{

    constructor(
        private UserDTO: IUserDTO
    ){};

    async list(filters): Promise<Result<User[]>> {
        try{

            // Retrieve all users from database
            const response = await prismaClient.user.findMany({
                where: filters
            });

            // Creates an user list to send back with the result
            const users : User[] = [];

            response.forEach((user) => {
                users.push(this.UserDTO.dataToUser(user));
            });

            return Result.ok<User[]>(users);
        }catch(err){
            return Result.fail<User[]>(err.message);
        };
    };
};