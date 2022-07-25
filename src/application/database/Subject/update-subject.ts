import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { IUpdateSubjectRepository } from "../../repositories/Subject/subject-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class UpdateSubjectRepository implements IUpdateSubjectRepository{

    async execute(subject: Subject): Promise<Result<Subject>> {

        try{
            await prismaClient.subject.update({
                where:{
                    id: subject.id
                },
                data:{
                    ...subject.props
                }
            });

            return Result.ok<Subject>(subject);

        }catch{
            return Result.fail<Subject>('Could not update subject on database');
        };
    };
};