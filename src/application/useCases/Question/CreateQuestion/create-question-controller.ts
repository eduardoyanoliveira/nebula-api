import { Request, Response } from 'express';
import { IQuestionDTO } from '../../../DTOs/Question/question-dto';
import { CreateQuestionService } from './create-question-service';

export class CreateQuestionController {
    constructor(
        private CreateQuestionService: CreateQuestionService,
        private QuestionDTO: IQuestionDTO
    ){};

    async handle(req: Request, res: Response){

        const { title, text, is_public, subject_id } = req.body;
        const author_id = req.user_id;

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

        const question = this.QuestionDTO.questionToResponse(questionOrError.getValue());

        return res.json(question);
    };
};