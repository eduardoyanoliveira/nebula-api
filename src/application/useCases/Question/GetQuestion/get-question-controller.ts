import { Request, Response } from 'express';
import { IQuestionToResponse } from '../../../DTOs/Question/question-to-response';
import { GetQuestionService } from './get-question-service';

export class GetQuestionController {
    constructor(
        private GetQuestionService : GetQuestionService,
        private QuestionToResponse: IQuestionToResponse,
    ){};

    async handle(req: Request, res: Response) {

        const id = req.params.id;

        const questionOrError = await this.GetQuestionService.execute({ question_id: id });

        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        const question = this.QuestionToResponse.transform(questionOrError.getValue());

        return res.json(question);
    };
};