import { Request, Response } from "express";
import { ILikeToReponse } from "../../../DTOs/Like/like-to-response";
import { FindLikeByAuthorAndAnswerService } from "./find-like-by-author-and-answer-service";


export class FindLikeByAuthorAndAnswerController {

    constructor(
        private FindLikeByAuthorAndAnswerService: FindLikeByAuthorAndAnswerService,
        private LikeToResponse: ILikeToReponse
    ){};

    async handle(req: Request, res: Response){

        const { userId, answerId } = req.body;

        const response = await this.FindLikeByAuthorAndAnswerService.execute({ userId, answerId });

        if(response.isFailure) throw new Error(response.error);

        const like = this.LikeToResponse.transform(response.getValue());

        return res.json(like);

    };
};