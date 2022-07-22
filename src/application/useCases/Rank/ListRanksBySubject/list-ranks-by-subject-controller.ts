import { Request, Response } from 'express';
import { IRankResponseProps } from '../../../DTOs/Rank/interfaces';
import { IRankDTO } from '../../../DTOs/Rank/rank-dto';
import { ListRanksBySubjectService } from './list-ranks-by-subject-service';

export class ListRanksBySubjectController {
    constructor(
        private ListRanksBySubjectService : ListRanksBySubjectService,
        private RankDTO : IRankDTO
    ){};

    async handle(req: Request, res: Response) {
        const { subject_id } = req.body;

        const ranksOrError = await this.ListRanksBySubjectService.execute({subject_id});

        if(ranksOrError.isFailure){
            throw new Error(ranksOrError.error);
        };

        const ranks : IRankResponseProps[] = [];

        ranksOrError.getValue().forEach((rank) => {
            ranks.push(this.RankDTO.rankToResponse(rank));
        });

        return res.json(ranks);
    };
};