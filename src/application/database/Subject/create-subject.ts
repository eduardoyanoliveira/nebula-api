import { Result } from "../../core/Result";
import { Subject } from "../../domain/entities/Subject";
import { ICreateSubjectRepository } from "../../repositories/Subject/subject-repositories";
import { prismaClient } from "../prisma/prismaClient";
import { RankCreateManyInputs } from 'prisma';

export class CreateSubjectRepository implements ICreateSubjectRepository{

    async execute(subject: Subject): Promise<Result<Subject>>{
  
        const users = await prismaClient.user.findMany({});

        const dataToCreateRanks : RankCreateManyInputs[] = users.map((user) =>{
            return {
                subject_id: subject.id,
                user_id: user.id,
                points: 0
            }
        });

        try{
            
            await prismaClient.$transaction(async () => {
                const subjectResponse = await prismaClient.subject.create({
                    data:{
                        id: subject.id,
                        ...subject.props
                    }
                });

                const ranksResponse =  await prismaClient.rank.createMany({
                    data: dataToCreateRanks
                });

                return { subjectResponse, ranksResponse}
            });

            return Result.ok<Subject>(subject);
        }catch(err){
            return Result.fail<Subject>(err.message);
        };
    };
};
