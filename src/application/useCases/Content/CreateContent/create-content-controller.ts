import { Request, Response } from "express";
import { IContentDTO } from "../../../DTOs/Content/content-dto";
import { CreateContentService } from './create-content-service';

export class CreateContentController {

    constructor(
        private CreateContentService: CreateContentService,
        private ContentDTO: IContentDTO
    ){};

    async handle(req: Request, res: Response){

        const { description, url, subject_id } = req.body;

        const contentOrError = await this.CreateContentService.execute({
            description,
            url,
            subject_id
        });

        if(contentOrError.isFailure){
            throw new Error(contentOrError.error);
        };

        return res.json(this.ContentDTO.contentToResponse(contentOrError.getValue()));
        
    };
};