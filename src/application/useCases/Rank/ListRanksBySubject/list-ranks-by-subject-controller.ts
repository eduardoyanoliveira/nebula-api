import { Request, Response } from 'express';
import { IRankResponseProps } from '../../../DTOs/Rank/interfaces';
import { IRankToResponse } from '../../../DTOs/Rank/rank-to-response';
import { ListRanksBySubjectService } from './list-ranks-by-subject-service';

export class ListRanksBySubjectController {
    constructor(
        private ListRanksBySubjectService : ListRanksBySubjectService,
        private RankToResponse : IRankToResponse
    ){};

    async handle(req: Request, res: Response) {
        const { subject_id } = req.body;

        const ranksOrError = await this.ListRanksBySubjectService.execute({subject_id});

        if(ranksOrError.isFailure){
            throw new Error(ranksOrError.error);
        };

        const ranks : IRankResponseProps[] = [];

        ranksOrError.getValue().forEach((rank) => {
            ranks.push(this.RankToResponse.transform(rank));
        });

        return res.json(ranks);
    };
};