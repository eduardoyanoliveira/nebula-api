import { Request, Response } from "express";
import { ListBestAnswersByAuthorService } from './list-best-answers-by-author-service';


export class ListBestAnswersByAuthorController {

    constructor(
        private ListBestAnswersByAuthorService : ListBestAnswersByAuthorService,
    ){};
    async handle(req: Request, res: Response){

        const { author_id } = req.body;

        const response = await this.ListBestAnswersByAuthorService.execute({
            author_id
        });

        if(response.isFailure){
            throw new Error(response.error);
        };

        return res.status(200).json(response.getValue());

    };
};