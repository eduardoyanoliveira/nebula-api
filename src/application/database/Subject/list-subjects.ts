import { Result } from "../../core/Result";
import { Subject } from "../../domain/entities/Subject";
import { IDataToSubject } from "../../DTOs/Subject/data-to-subject";
import { IListSubjectsRepository } from "../../repositories/Subject/subject-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class ListSubjectsRepository implements IListSubjectsRepository{

    constructor(
        private DataToSubject: IDataToSubject
    ){};

    async execute(filters): Promise<Result<Subject[]>> {

        try{
            const response = await prismaClient.subject.findMany({
                where:filters
            });

            const subjects: Subject[] = [];
    
            response.forEach((subject) => {
                subjects.push(this.DataToSubject.transform(subject));
            });
    
            return Result.ok<Subject[]>(subjects);
        }catch{
            return Result.fail<Subject[]>('Error on retrieving subjects from database');
        };
    };

};