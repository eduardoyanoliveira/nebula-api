import { Request, Response } from 'express';
import { IContentDTO } from '../../../DTOs/Content/content-dto';
import { ListContentsService } from './list-contents-service';
import { objectToWhere } from '../../../../utils/prisma-filters';

export class ListContentsController {
    constructor(
        private ListContentsService: ListContentsService,
        private ContentDTO: IContentDTO
    ){};

    async handle(req: Request, res: Response){
        const filters = objectToWhere(req.query)

        const contentsOrError = await this.ListContentsService.execute({
            filters
        });

        if(contentsOrError.isFailure){
            throw new Error(contentsOrError.error);
        };

        const contents : object[] = [];
        
        contentsOrError.getValue().forEach((content) => {
            contents.push(this.ContentDTO.contentToResponse(content));
        });

        return res.json(contents);
    };
};