import { Request, Response } from "express";
import { CreateLikeService } from './create-like-service';

export class CreateLikeController {
    constructor(
        private CreateLikeService: CreateLikeService
    ){};

    async handle(req: Request, res: Response){

        const { answerId } = req.body;

        const userId = req.user_id;

        const response = await this.CreateLikeService.execute({
            userId,
            answerId
        });

        if(response.isFailure) throw new Error(response.error);

        return res.json(response.getValue());
    };
};