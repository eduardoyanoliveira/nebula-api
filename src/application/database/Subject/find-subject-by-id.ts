import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { ISubjectRepository } from "../../repositories/Subject/subject-repository";
import { prismaClient } from "../prisma/prismaClient";
import { ISubjectDTO } from '../../DTOs/Subject/subject-dto';

interface IFindSubjectById extends Pick<ISubjectRepository, 'findById'>{};

export class FindSubjectById implements IFindSubjectById{

    constructor(
        private SubjectDTO: ISubjectDTO
    ){};

    async findById(subject_id: string): Promise<Result<Subject>> {
        
        const response = await prismaClient.subject.findFirst({
            where:{
                id: subject_id
            }
        });

        if(!response){
            return Result.fail<Subject>("Couldn't find the subject with the given id");
        };

        return Result.ok<Subject>(this.SubjectDTO.dataToSubject(response));
    };
};