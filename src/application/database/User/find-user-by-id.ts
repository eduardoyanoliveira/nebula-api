import { Result } from "../../../core/Result";
import { Role, User } from "../../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IUserRepository } from "../../repositories/User/user-repository";
import { IUserDTO } from "../../DTOs/User/user-dto";

export interface IFindUserById extends Pick<IUserRepository, 'findById'>{};

export class FindUserById implements IFindUserById{

    constructor(
        private UserDTO: IUserDTO
    ){};

    async findById(user_id: string): Promise<Result<User>> {
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

            return Result.ok<User>(this.UserDTO.dataToUser(response));
        }catch(err){
            return Result.fail<User>(err.message);
        };
    };
};