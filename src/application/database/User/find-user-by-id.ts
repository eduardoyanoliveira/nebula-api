import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IFindUserByIdRepository } from "../../repositories/User/user-repositories";
import { IDataToUser } from "../../DTOs/User/data-to-user";

export class FindUserByIdRepository implements IFindUserByIdRepository{

    constructor(
        private DataToUser: IDataToUser
    ){};

    async execute(user_id: string): Promise<Result<User>> {
        try{

            // Retrieve an user from database
            const response = await prismaClient.user.findUnique({
                where:{
                    id: user_id
                }
            });

            if(!response){
                return Result.fail<User>("Couldn't find the user with the given id");
            };

            return Result.ok<User>(this.DataToUser.transform(response));
        }catch(err){
            return Result.fail<User>(err.message);
        };
    };
};