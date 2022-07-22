import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { ISubjectRepository } from "../../repositories/Subject/subject-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IUpdateSubject extends Pick<ISubjectRepository, 'update'>{};

export class UpdateSubject implements IUpdateSubject{

    async update(subject: Subject): Promise<Result<Subject>> {

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