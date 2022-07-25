import { Request, Response } from 'express';
import { IRankmarkToResponse } from '../../../DTOs/Rankmark/rankmark-to-response';
import { UpdateRankmarkService } from './update-rankmark-service';

export class UpdateRankmarkController {
    constructor(
        private UpdateRankmarkService : UpdateRankmarkService,
        private RankmarkToResponse: IRankmarkToResponse
    ){};

    async handle(req: Request, res: Response){
        const id = req.params.id;
        const { name, color, points, is_active } = req.body;

        const rankmarkOrError = await this.UpdateRankmarkService.execute({
            id,
            name,
            color,
            points,
            is_active,
        });

        if(rankmarkOrError.isFailure){
            throw new Error(rankmarkOrError.error);
        };

        return res.json(this.RankmarkToResponse.transform(rankmarkOrError.getValue()));
    };
};