import { Request, Response } from 'express';
import { IQuestionDTO } from '../../../DTOs/Question/question-dto';
import { GetQuestionService } from './get-question-service';

export class GetQuestionController {
    constructor(
        private GetQuestionService : GetQuestionService,
        private QuestionDTO: IQuestionDTO,
    ){};

    async handle(req: Request, res: Response) {

        const id = req.params.id;

        const questionOrError = await this.GetQuestionService.execute({ question_id: id });

        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        const question = this.QuestionDTO.questionToResponse(questionOrError.getValue());

        return res.json(question);
    };
};