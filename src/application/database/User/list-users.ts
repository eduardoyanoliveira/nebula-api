import { Result } from "../../core/Result";
import { User } from "../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IListUsersRepository } from "../../repositories/User/user-repositories";
import { IDataToUser } from "../../DTOs/User/data-to-user";

export class ListUsersRepository implements IListUsersRepository{

    constructor(
        private DataToUser: IDataToUser
    ){};

    async execute(filters): Promise<Result<User[]>> {
        try{

            // Retrieve all users from database
            const response = await prismaClient.user.findMany({
                where: filters
            });

            // Creates an user list to send back with the result
            const users : User[] = [];

            response.forEach((user) => {
                users.push(this.DataToUser.transform(user));
            });

            return Result.ok<User[]>(users);
        }catch(err){
            return Result.fail<User[]>(err.message);
        };
    };
};