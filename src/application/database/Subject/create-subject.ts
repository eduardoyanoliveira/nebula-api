import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { ISubjectRepository } from "../../repositories/Subject/subject-repository";
import { prismaClient } from "../prisma/prismaClient";
import { RankCreateManyInputs } from 'prisma';

interface ICreateSubject extends Pick<ISubjectRepository, 'create'>{};

export class CreateSubject implements ICreateSubject{

    async create(subject: Subject): Promise<Result<Subject>>{
  
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
