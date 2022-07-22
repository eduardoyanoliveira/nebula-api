import { Request, Response } from "express";
import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { GetSubjectService } from './get-subject-service';
import { ISubjectDTO } from '../../../DTOs/Subject/subject-dto';

export class GetSubjectController{

    constructor(
        private GetSubjectService: GetSubjectService,
        private SubjectDTO : ISubjectDTO
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;

        const subjectOrError : Result<Subject> = await this.GetSubjectService.execute({ id });

        if(subjectOrError.isFailure){
            throw new Error(subjectOrError.error);
        };

        return res.json(this.SubjectDTO.subjectToResponse(subjectOrError.getValue()));
    };
};