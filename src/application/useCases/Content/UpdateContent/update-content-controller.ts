import { Request, Response } from 'express';
import { IContentDTO } from '../../../DTOs/Content/content-dto';
import { UpdateContentService } from './update-content-service';

export class UpdateContentController {
    constructor(
        private UpdateContentService : UpdateContentService,
        private ContentDTO: IContentDTO
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

        return res.json(this.ContentDTO.contentToResponse(contentOrError.getValue()));
    };
};