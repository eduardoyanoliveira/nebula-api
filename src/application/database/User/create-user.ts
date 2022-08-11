import { Result } from "../../core/Result";
import { User } from "../../domain/entities/User";
import { prismaClient } from '../prisma/prismaClient';
import { RankCreateManyInputs } from 'prisma';
import { ICreateUserRepository } from "../../repositories/User/user-repositories";

export class CreateUserRepository implements ICreateUserRepository{

    async execute(user: User): Promise<Result<User>> {

        // Retrieve all subjects from database to generate the subject ranks
        const subjects = await prismaClient.subject.findMany({});

        // Transform the subjects in RankCreateManyInputs
        const dataToCreateRanks : RankCreateManyInputs[] = subjects.map((subject) => {
            return {
                user_id: user.id,
                subject_id: subject.id,
                points: 0
            }
        });

        try{
            
            await prismaClient.$transaction(async () => {
                const userResponse = await prismaClient.user.create({
                    data:{
                        id: user.id,
                        ...user.props
                    }
                });

                const ranksResponse =  await prismaClient.rank.createMany({
                    data: dataToCreateRanks
                });

                return { userResponse, ranksResponse}
            });

            return Result.ok<User>(user);
        }catch(err){
            return Result.fail<User>(err.message);
        };

    };
};