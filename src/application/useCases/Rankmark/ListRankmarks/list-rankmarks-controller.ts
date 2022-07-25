import { Request, Response } from 'express';
import { IRankmarkDataProps } from '../../../DTOs/Rankmark/interfaces';
import { ListRankmarksService } from './list-rankmarks-service';
import { objectToWhere } from '../../../../utils/prisma-filters'; 
import { IRankmarkToResponse } from '../../../DTOs/Rankmark/rankmark-to-response';

export class ListRankmarksController {
    constructor(
        private ListRankmarksService : ListRankmarksService,
        private RankmarkToResponse: IRankmarkToResponse
    ){};

    async handle(req: Request, res: Response){

        const filters = objectToWhere(req.query);

        const rankmarksOrError = await this.ListRankmarksService.execute({ filters });

        if(rankmarksOrError.isFailure){
            throw new Error(rankmarksOrError.error);
        };

        const rankmarks : IRankmarkDataProps[] = [];

        rankmarksOrError.getValue().forEach((rankmark) => {
            rankmarks.push(this.RankmarkToResponse.transform(rankmark));
        });

        return res.json(rankmarks);
    };
};