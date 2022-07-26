import { Request, Response } from 'express';
import { objectToWhere } from '../../../../utils/prisma-filters';
import { IAnswerToResponse } from '../../../DTOs/Answers/answer-to-response';
import { IAnswerToResponseProps } from '../../../DTOs/Answers/interfaces';
import { ListAnswersService } from './list-answers-service';

export class ListAnswersController {
    constructor(
        private ListAnswersService: ListAnswersService,
        private AnswerToResponse: IAnswerToResponse
    ){};

    async handle(req: Request, res: Response){

        const filters = objectToWhere(req.query);

        const answersOrError = await this.ListAnswersService.execute({ filters });

        if(answersOrError.isFailure){
            throw new Error(answersOrError.error);
        };

        const answers : IAnswerToResponseProps[] = [];

        answersOrError.getValue().forEach((answer) => {
            answers.push(this.AnswerToResponse.transform(answer));
        });

        return res.json(answers);
    };
};