import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { ISubjectDTO } from "../../DTOs/Subject/subject-dto";
import { ISubjectRepository } from "../../repositories/Subject/subject-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IListSubjects extends Pick<ISubjectRepository, 'list'>{};

export class ListSubjects implements IListSubjects{

    constructor(
        private SubjectDTO: ISubjectDTO
    ){};

    async list(filters): Promise<Result<Subject[]>> {

        try{
            const response = await prismaClient.subject.findMany({
                where:filters
            });

            const subjects: Subject[] = [];
    
            response.forEach((subject) => {
                subjects.push(this.SubjectDTO.dataToSubject(subject));
            });
    
            return Result.ok<Subject[]>(subjects);
        }catch{
            return Result.fail<Subject[]>('Error on retrieving subjects from database');
        };
    };

};