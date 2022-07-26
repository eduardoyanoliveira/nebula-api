import { Request, Response } from 'express';
import { IQuestionToResponse } from '../../../DTOs/Question/question-to-response';
import { ChangeQuestionAccessSerivce } from './change-question-access-service';

export class ChangeQuestionAccessController {
    constructor(
        private ChangeQuestionAccessSerivce: ChangeQuestionAccessSerivce,
        private QuestionToResponse : IQuestionToResponse
    ){};

    async handle(req: Request, res: Response){

        const id = req.params.id;
        const { is_public } = req.body;
        const user_id = req.user_id;

        const questionOrError = await this.ChangeQuestionAccessSerivce.execute({
            id,
            user_id,
            is_public
        });


        if(questionOrError.isFailure){
            throw new Error(questionOrError.error);
        };

        return res.json(this.QuestionToResponse.transform(questionOrError.getValue()));

    };
};