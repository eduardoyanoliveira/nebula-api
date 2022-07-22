import { Request, Response } from "express";
import { ISubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { UpdateSubjectService } from "./update-subject-service";


export class UpdateSubjectController {
    constructor(
        private UpdateSubjectService : UpdateSubjectService,
        private SubjectDTO: ISubjectDTO
    ){};

    async handle(req: Request, res: Response){

        const id = req.params.id;
        const { name, is_active } = req.body;

        const subjectOrError = await this.UpdateSubjectService.execute({
            id,
            name,
            is_active
        });

        if(subjectOrError.isFailure){
            throw new Error(subjectOrError.error);
        };

        return res.json(this.SubjectDTO.subjectToResponse(subjectOrError.getValue()));
    };
};