import { Request, Response } from "express";
import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { GetSubjectService } from './get-subject-service';

import { ISubjectToResponse } from "../../../DTOs/Subject/subject-to-response";

export class GetSubjectController{

    constructor(
        private GetSubjectService: GetSubjectService,
        private SubjectToResponse : ISubjectToResponse
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;

        const subjectOrError : Result<Subject> = await this.GetSubjectService.execute({ id });

        if(subjectOrError.isFailure){
            throw new Error(subjectOrError.error);
        };

        return res.json(this.SubjectToResponse.transform(subjectOrError.getValue()));
    };
};