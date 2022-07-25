import { Request, Response } from "express";
import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { ISubjectToResponse } from "../../../DTOs/Subject/subject-to-response";
import { CreateSubjectService } from "./create-subject-service";


export class CreateSubjectController{

    constructor(
        private CreateSubjectService: CreateSubjectService,
        private SubjectToResponse: ISubjectToResponse
    ){};

    async handle(req: Request, res: Response){
        const { name } = req.body;

        const subjectOrError : Result<Subject> = await this.CreateSubjectService.execute({ name });

        if(subjectOrError.isFailure){
            throw new Error(subjectOrError.error);
        };

        return res.json(this.SubjectToResponse.transform(subjectOrError.getValue()));
    };
};