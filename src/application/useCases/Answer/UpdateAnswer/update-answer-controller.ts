import { Request, Response } from "express";
import { IAnswerToResponse } from "../../../DTOs/Answers/answer-to-response";
import { UpdateAnswerService } from "./update-answer-service";

export class UpdateAnswerController {

    constructor(
        private UpdateAnswerService: UpdateAnswerService,
        private AnswerToResponse: IAnswerToResponse
    ){};

    async handle(req: Request, res: Response){
        const { text } = req.body;
        const answer_id = req.params.id;
        const user_id = req.user_id;

        const answerOrError = await this.UpdateAnswerService.execute({
            answer_id,
            user_id,
            text
        });

        if(answerOrError.isFailure){
            throw new Error(answerOrError.error);
        };

        return res.json(this.AnswerToResponse.transform(answerOrError.getValue()));
    };
};