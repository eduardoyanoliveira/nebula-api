import { Request, Response } from 'express';
import { IQuestionDTO } from '../../../DTOs/Question/question-dto';
import { IQuestionToResponseProps } from '../../../DTOs/Question/interfaces';
import { ListQuestionsService } from './list-questions-service';
import { objectToWhere } from '../../../../utils/prisma-filters';

export class ListQuestionsController {
    constructor(
        private ListQuestionsService : ListQuestionsService,
        private QuestionDTO: IQuestionDTO
    ){};

    async handle(req : Request, res: Response){

        const filters = objectToWhere(req.query);

        const questionsOrError = await this.ListQuestionsService.execute({filters});

        if(questionsOrError.isFailure){
            throw new Error(questionsOrError.error);
        };

        const questions : IQuestionToResponseProps[] = [];

        questionsOrError.getValue().forEach((question) => {
            questions.push(this.QuestionDTO.questionToResponse(question));
        });

        return res.json(questions);
    };
};