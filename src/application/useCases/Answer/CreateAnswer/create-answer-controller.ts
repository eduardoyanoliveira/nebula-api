import { Request, Response } from "express";
import { IAnswerToResponse } from "../../../DTOs/Answers/answer-to-response";
import { CreateAnswerService } from './create-answer-service';

export class CreateAnswerController {
    constructor(
        private CreateAnswerService: CreateAnswerService,
        private AnswerToResponse: IAnswerToResponse
    ){};

    async handle(req: Request, res: Response){

        const { text, question_id } = req.body;
        const user_id = req.user_id;
        
        const answerOrError = await this.CreateAnswerService.execute({
            text,
            user_id,
            question_id
        });

        if(answerOrError.isFailure){
            throw new Error(answerOrError.error);
        };

        return res.json(this.AnswerToResponse.transform(answerOrError.getValue()));
    };
};