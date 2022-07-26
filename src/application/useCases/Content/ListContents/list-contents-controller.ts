import { Request, Response } from 'express';
import { ListContentsService } from './list-contents-service';
import { objectToWhere } from '../../../../utils/prisma-filters';
import { IContentToResponse } from '../../../DTOs/Content/content-to-response';

export class ListContentsController {
    constructor(
        private ListContentsService: ListContentsService,
        private ContentToResponse: IContentToResponse
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
            contents.push(this.ContentToResponse.transform(content));
        });

        return res.json(contents);
    };
};