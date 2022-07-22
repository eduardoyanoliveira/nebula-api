import { Request, Response } from 'express';
import { IQuestionDTO } from '../../../DTOs/Question/question-dto';
import { FinishQuestionService } from './finish-question-service';

export class FinishQuestionController {
    constructor(
        private FinishQuestionService : FinishQuestionService,
        private QuestionDTO: IQuestionDTO
    ){};

    async handle(req: Request, res: Response){

        const id = req.params.id;
        const { is_closed } = req.body;
        const user_id = req.user_id;

        const questionOrError = await this.FinishQuestionService.execute({
            id,
            user_id,
            is_closed
        });

        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        return res.json(this.QuestionDTO.questionToResponse(questionOrError.getValue()));
    };
};