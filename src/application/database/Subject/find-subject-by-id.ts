import { Result } from "../../core/Result";
import { Subject } from "../../domain/entities/Subject";
import { IFindSubjectByIdRepository } from "../../repositories/Subject/subject-repositories";
import { prismaClient } from "../prisma/prismaClient";
import { IDataToSubject } from '../../DTOs/Subject/data-to-subject';

export class FindSubjectByIdRepository implements IFindSubjectByIdRepository{

    constructor(
        private DataToSubject: IDataToSubject
    ){};

    async execute(subject_id: string): Promise<Result<Subject>> {
        
        const response = await prismaClient.subject.findFirst({
            where:{
                id: subject_id
            }
        });

        if(!response){
            return Result.fail<Subject>("Couldn't find the subject with the given id");
        };

        return Result.ok<Subject>(this.DataToSubject.transform(response));
    };
};