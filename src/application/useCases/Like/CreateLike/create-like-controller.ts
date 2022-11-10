import { Request, Response } from "express";
import { ILikeToReponse } from "../../../DTOs/Like/like-to-response";
import { CreateLikeService } from './create-like-service';

export class CreateLikeController {
    constructor(
        private CreateLikeService: CreateLikeService,
        private LikeToResponse: ILikeToReponse
    ){};

    async handle(req: Request, res: Response){

        const { answerId } = req.body;

        const userId = req.user_id;

        const response = await this.CreateLikeService.execute({
            userId,
            answerId
        });

        if(response.isFailure) throw new Error(response.error);

        const like = this.LikeToResponse.transform(response.getValue());

        return res.json(like);
    };
};