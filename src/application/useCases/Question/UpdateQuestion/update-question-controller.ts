import { Request, Response } from 'express';
import { UpdateQuestionService } from './update-question-service';
import { IQuestionDTO } from '../../../DTOs/Question/question-dto';

export class UpdateQuestionController {
    constructor(
        private UpdateQuestionService: UpdateQuestionService,
        private QuestionDTO : IQuestionDTO
    ){};

    async handle(req: Request, res: Response){

        const id = req.params.id;
        const { title, text, subject_id } = req.body;
        const user_id = req.user_id;

        const questionOrError = await this.UpdateQuestionService.execute({
            id,
            user_id,
            title,
            text,
            subject_id
        });


        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        return res.json(this.QuestionDTO.questionToResponse(questionOrError.getValue()));

    };
};