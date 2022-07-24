import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { prismaClient } from "../prisma/prismaClient";
import { IUpdateUserRepository } from "../../repositories/User/user-repository";


export class UpdateUserRepository implements IUpdateUserRepository{

    async execute(user: User): Promise<Result<User>> {
        
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