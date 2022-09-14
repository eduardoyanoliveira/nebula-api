import { Request, Response } from "express";
import { RemoveBestAnswerByQuestionService } from "./remove-best-answer-by-question-service";


export class RemoveBestAnswerByQuestionController {

    constructor(
        private RemoveBestAnswerByQuestionService : RemoveBestAnswerByQuestionService
    ){};

    async handle(req: Request, res: Response){

        const questionId = req.params.id;

        const response = await this.RemoveBestAnswerByQuestionService.execute({
            questionId
        });

        if(response.isFailure){
            throw new Error(response.error);
        };

        return res.status(200).json(response.getValue());
    };
};