import { Result } from "../../core/Result";
import { Subject } from "../../domain/entities/Subject";
import { ICreateSubjectRepository } from "../../repositories/Subject/subject-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class CreateSubjectRepository implements ICreateSubjectRepository{

    async execute(subject: Subject): Promise<Result<Subject>>{
  
        try{
            
            await prismaClient.$transaction(async () => {
                const subjectResponse = await prismaClient.subject.create({
                    data:{
                        id: subject.id,
                        ...subject.props
                    }
                });

                return { subjectResponse }
            });

            return Result.ok<Subject>(subject);
        }catch(err){
            return Result.fail<Subject>(err.message);
        };
    };
};
