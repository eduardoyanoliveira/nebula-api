import { Request, Response } from "express";
import { IContentToResponse } from "../../../DTOs/Content/content-to-response";
import { CreateContentService } from './create-content-service';

export class CreateContentController {

    constructor(
        private CreateContentService: CreateContentService,
        private ContentToResponse: IContentToResponse
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

        return res.json(this.ContentToResponse.transform(contentOrError.getValue()));
        
    };
};