import { Request, Response } from 'express';
import { UpdateQuestionService } from './update-question-service';
import { IQuestionToResponse } from '../../../DTOs/Question/question-to-response';

export class UpdateQuestionController {
    constructor(
        private UpdateQuestionService: UpdateQuestionService,
        private QuestionToResponse : IQuestionToResponse
    ){};

    async handle(req: Request, res: Response){

        const id = req.params.id;
        const { title, text, subject_id, is_public, is_closed } = req.body;
        const { subject } = req.body;
   

        const user_id = req.user_id;

        const questionOrError = await this.UpdateQuestionService.execute({
            id,
            user_id,
            title,
            text,
            subject_id: subject_id || subject?.id,
            is_public,
            is_closed
        });


        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        return res.json(this.QuestionToResponse.transform(questionOrError.getValue()));

    };
};