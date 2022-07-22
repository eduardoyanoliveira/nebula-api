import { Request, Response } from "express";
import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { objectToWhere } from "../../../../utils/prisma-filters";
import { ISubjectDataProps } from "../../../DTOs/Subject/interfaces";
import { ISubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { ListSubjectsService } from "./list-subjects-service";

export class ListSubjectsController{

    constructor(
        private ListSubjectsService: ListSubjectsService,
        private SubjectDTO: ISubjectDTO
    ){};

    async handle(req: Request, res: Response){

        const filters = objectToWhere(req.query);

        const subjectsOrError : Result<Subject[]> = await this.ListSubjectsService.execute({filters});

        if(subjectsOrError.isFailure){
            throw new Error(subjectsOrError.error);
        };

        // Creates the subject list to be returned in the response
        
        const subjects : ISubjectDataProps[] = [];

        subjectsOrError.getValue().forEach((subject) => {
            subjects.push(this.SubjectDTO.subjectToResponse(subject));
        });

        return res.json(subjects);
    };
};