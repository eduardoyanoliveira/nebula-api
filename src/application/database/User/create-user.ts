import { Result } from "../../core/Result";
import { User } from "../../domain/entities/User";
import { prismaClient } from '../prisma/prismaClient';
import { ICreateUserRepository } from "../../repositories/User/user-repositories";

export class CreateUserRepository implements ICreateUserRepository{

    async execute(user: User): Promise<Result<User>> {

        try{

            await prismaClient.$transaction(async () => {
                const userResponse = await prismaClient.user.create({
                    data:{
                        id: user.id,
                        ...user.props
                    }
                });

                return { userResponse }
            });

            return Result.ok<User>(user);
        }catch(err){
            return Result.fail<User>(err.message);
        };

    };
};