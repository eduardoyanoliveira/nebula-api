import { Request, Response } from "express";
import { FindBestAnswerByQuestionService } from "./find-best-answer-by-question-service";


export class FindBestAnswerByQuestionController {
  
    constructor(
        private FindBestAnswerByQuestionService: FindBestAnswerByQuestionService
    ){};

    async handle(req: Request, res: Response){
        const questionId = req.params.id;

        const response = await this.FindBestAnswerByQuestionService.execute({
            questionId
        });

        if(response.isFailure){
            throw new Error(response.error);
        };

        return res.status(200).json(response.getValue());

    };
};