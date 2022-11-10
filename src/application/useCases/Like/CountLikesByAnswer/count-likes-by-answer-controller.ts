import { Request, Response } from "express";
import { CountLikesByAnswerService } from "./count-likes-by-answer-service";


export class CountLikesByAnswerController {
    constructor(
        private CountLikeByAnswerService: CountLikesByAnswerService
    ){};

    async handle(req: Request, res: Response){
        const answerId = req.params.answerId;

        const response = await this.CountLikeByAnswerService.execute({
            answerId
        });

        if(response.isFailure) throw new Error(response.error);

        return res.json(response.getValue());
    };
};