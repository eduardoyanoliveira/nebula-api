import { Request, Response } from 'express';
import { objectToWhere } from '../../../../utils/prisma-filters';
import { IAnswerDTO } from '../../../DTOs/Answers/answer-dto';
import { IAnswerToResponseProps } from '../../../DTOs/Answers/interfaces';
import { ListAnswersService } from './list-answers-service';

export class ListAnswersController {
    constructor(
        private ListAnswersService: ListAnswersService,
        private AnswerDTO: IAnswerDTO
    ){};

    async handle(req: Request, res: Response){

        const filters = objectToWhere(req.query);

        const answersOrError = await this.ListAnswersService.execute({ filters });

        if(answersOrError.isFailure){
            throw new Error(answersOrError.error);
        };

        const answers : IAnswerToResponseProps[] = [];

        answersOrError.getValue().forEach((answer) => {
            answers.push(this.AnswerDTO.answerToResponse(answer));
        });

        return res.json(answers);
    };
};