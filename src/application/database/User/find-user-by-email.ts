import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IUserRepository } from "../../repositories/User/user-repository";
import { IUserDTO } from '../../DTOs/User/user-dto';

export interface IFindUserByEmail extends Pick<IUserRepository, 'findByEmail'>{};

export class FindUserByEmail implements IFindUserByEmail{

    constructor(
        private UserDTO: IUserDTO
    ){};

    async findByEmail(email: string): Promise<Result<User>> {
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

            return Result.ok<User>(this.UserDTO.dataToUser(response));
        }catch(err){
            return Result.fail<User>(err.message);
        };
    };
};