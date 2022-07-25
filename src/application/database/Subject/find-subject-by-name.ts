import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { IDataToSubject } from "../../DTOs/Subject/data-to-subject";
import { IFindSubjectByNameRepository } from "../../repositories/Subject/subject-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class FindSubjectByNameRepository implements IFindSubjectByNameRepository{

    constructor(
        private DataToSubject: IDataToSubject
    ){};

    async execute(name: string): Promise<Result<Subject>> {
        
        const response = await prismaClient.subject.findUnique({
            where:{
                name: name
            }
        });

        if(!response){
            return Result.fail<Subject>("Couldn't find the subject with the given name");
        };

        return Result.ok<Subject>(this.DataToSubject.transform(response));
    };
};