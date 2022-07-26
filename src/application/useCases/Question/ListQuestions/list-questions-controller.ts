import { Request, Response } from 'express';
import { IQuestionToResponseProps } from '../../../DTOs/Question/interfaces';
import { ListQuestionsService } from './list-questions-service';
import { objectToWhere } from '../../../../utils/prisma-filters';
import { IQuestionToResponse } from '../../../DTOs/Question/question-to-response';

export class ListQuestionsController {
    constructor(
        private ListQuestionsService : ListQuestionsService,
        private QuestionToResponse: IQuestionToResponse
    ){};

    async handle(req : Request, res: Response){

        const filters = objectToWhere(req.query);

        const questionsOrError = await this.ListQuestionsService.execute({filters});

        if(questionsOrError.isFailure){
            throw new Error(questionsOrError.error);
        };

        const questions : IQuestionToResponseProps[] = [];

        questionsOrError.getValue().forEach((question) => {
            questions.push(this.QuestionToResponse.transform(question));
        });

        return res.json(questions);
    };
};