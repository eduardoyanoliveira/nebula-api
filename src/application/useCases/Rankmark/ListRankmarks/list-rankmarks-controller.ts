import { Request, Response } from 'express';
import { IRankmarkDataProps } from '../../../DTOs/Rankmark/interfaces';
import { IRankmarkDTO } from '../../../DTOs/Rankmark/rankmark-dto';
import { ListRankmarksService } from './list-rankmarks-service';
import { objectToWhere } from '../../../../utils/prisma-filters'; 

export class ListRankmarksController {
    constructor(
        private ListRankmarksService : ListRankmarksService,
        private RankmarkDTO: IRankmarkDTO
    ){};

    async handle(req: Request, res: Response){

        const filters = objectToWhere(req.query);

        const rankmarksOrError = await this.ListRankmarksService.execute({ filters });

        if(rankmarksOrError.isFailure){
            throw new Error(rankmarksOrError.error);
        };

        const rankmarks : IRankmarkDataProps[] = [];

        rankmarksOrError.getValue().forEach((rankmark) => {
            rankmarks.push(this.RankmarkDTO.rankmarkToResponse(rankmark));
        });

        return res.json(rankmarks);
    };
};