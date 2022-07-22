import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IUserRepository } from "../../repositories/User/user-repository";

export interface IUpdateUser extends Pick<IUserRepository, 'update'>{};

export class UpdateUser implements IUpdateUser{

    async update(user: User): Promise<Result<User>> {
        
        try{

            await prismaClient.user.update({
                where:{
                    id: user.id,
                },
                data:{
                    ...user.props
                }
            });
    
            return Result.ok<User>(user);
        }catch(err){
            return Result.fail<User>(err.message);
        };
    };
};