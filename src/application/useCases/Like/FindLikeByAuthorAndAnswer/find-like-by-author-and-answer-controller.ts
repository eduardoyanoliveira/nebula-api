import { Request, Response } from "express";
import { FindLikeByAuthorAndAnswerService } from "./find-like-by-author-and-answer-service";


export class FindLikeByAuthorAndAnswerController {

    constructor(
        private FindLikeByAuthorAndAnswerService: FindLikeByAuthorAndAnswerService
    ){};

    async handle(req: Request, res: Response){

        const { userId, answerId } = req.body;

        const response = await this.FindLikeByAuthorAndAnswerService.execute({ userId, answerId });

        if(response.isFailure) throw new Error(response.error);

        return res.json(response.getValue());

    };
};