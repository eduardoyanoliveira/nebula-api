import { Request, Response } from "express";
import { CreateBestAnswerService } from "./create-best-answer-service";

export class CreateBestAnswerController {
    constructor(
        private CreateBestAnswerService: CreateBestAnswerService
    ){};

    async handle(req: Request, res: Response) {
        const { question_id, answer_id } = req.body;

        const response = await this.CreateBestAnswerService.execute({
            answer_id,
            question_id
        });

        if(response.isFailure){
            throw new Error(response.error);
        };

        const bestAnswer = response.getValue();

        return res.status(201).json({
            id: bestAnswer.id,
            question_id: bestAnswer.props.question.id,
            answer_id: bestAnswer.props.answer.id
        });
    };
};