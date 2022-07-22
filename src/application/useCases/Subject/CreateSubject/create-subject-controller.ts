import { Request, Response } from "express";
import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { ISubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { CreateSubjectService } from "./create-subject-service";


export class CreateSubjectController{

    constructor(
        private CreateSubjectService: CreateSubjectService,
        private SubjectDTO: ISubjectDTO
    ){};

    async handle(req: Request, res: Response){
        const { name } = req.body;

        const subjectOrError : Result<Subject> = await this.CreateSubjectService.execute({ name });

        if(subjectOrError.isFailure){
            throw new Error(subjectOrError.error);
        };

        return res.json(this.SubjectDTO.subjectToResponse(subjectOrError.getValue()));
    };
};