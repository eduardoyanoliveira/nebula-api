import { Request, Response } from "express";
import { FindLikeByAuthorAndAnswerService } from "./find-like-by-author-and-answer-service";

export class FindLikeByAuthorAndAnswerController {

    constructor(
        private FindLikeByAuthorAndAnswerService: FindLikeByAuthorAndAnswerService,
    ){};

    async handle(req: Request, res: Response){

        const answerId = req.params.id;
        const userId = req.user_id;

        const response = await this.FindLikeByAuthorAndAnswerService.execute({ userId, answerId });

        if(response.isFailure) return res.json(false);

        return res.json(true);

    };
};