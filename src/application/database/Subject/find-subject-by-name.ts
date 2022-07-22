import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { ISubjectDTO } from "../../DTOs/Subject/subject-dto";
import { ISubjectRepository } from "../../repositories/Subject/subject-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IFindSubjectByName extends Pick<ISubjectRepository, 'findByName'>{};

export class FindSubjectByName implements IFindSubjectByName{

    constructor(
        private SubjectDTO: ISubjectDTO
    ){};

    async findByName(name: string): Promise<Result<Subject>> {
        
        const response = await prismaClient.subject.findUnique({
            where:{
                name: name
            }
        });

        if(!response){
            return Result.fail<Subject>("Couldn't find the subject with the given name");
        };

        return Result.ok<Subject>(this.SubjectDTO.dataToSubject(response));
    };
};