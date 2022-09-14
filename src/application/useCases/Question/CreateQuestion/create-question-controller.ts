import { Request, Response } from 'express';
import { IQuestionToResponse } from '../../../DTOs/Question/question-to-response';
import { CreateQuestionService } from './create-question-service';

export class CreateQuestionController {
    constructor(
        private CreateQuestionService: CreateQuestionService,
        private QuestionToResponse: IQuestionToResponse
    ){};

    async handle(req: Request, res: Response){

        const { title, text, is_public, subject } = req.body;
        let { subject_id } = req.body;
        const author_id = req.user_id;

        if(!subject_id){
            subject_id = subject.id
        };

        const questionOrError = await this.CreateQuestionService.execute({
            title,
            text,
            is_public,
            author_id,
            subject_id
        });

        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        const question = this.QuestionToResponse.transform(questionOrError.getValue());

        return res.json(question);
    };
};