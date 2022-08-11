import { Result } from "../../core/Result";
import { User } from "../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IDataToUser } from "../../DTOs/User/data-to-user";
import { IFindUserByEmailRepository } from "../../repositories/User/user-repositories";

export class FindUserByEmailRepository implements IFindUserByEmailRepository{

    constructor(
        private DataToUser: IDataToUser
    ){};

    async execute(email: string): Promise<Result<User>> {
        try{

            // Retrieve an user from database
            const response = await prismaClient.user.findUnique({
                where:{
                    email
                }
            });

            if(!response){
                return Result.fail<User>("Couldn't find the user with the given email");
            };

            return Result.ok<User>(this.DataToUser.transform(response));
        }catch(err){
            return Result.fail<User>(err.message);
        };
    };
};