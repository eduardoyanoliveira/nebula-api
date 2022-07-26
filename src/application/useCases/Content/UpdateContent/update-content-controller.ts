import { Request, Response } from 'express';
import { IContentToResponse } from '../../../DTOs/Content/content-to-response';
import { UpdateContentService } from './update-content-service';

export class UpdateContentController {
    constructor(
        private UpdateContentService : UpdateContentService,
        private ContentToResponse: IContentToResponse
    ){};

    async handle(req: Request, res: Response){

        const id = req.params.id;
        const { description, url, subject_id } = req.body;

        const contentOrError = await this.UpdateContentService.execute({
            id,
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