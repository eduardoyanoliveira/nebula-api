import { Request, Response } from 'express';
import { IRankmarkDTO } from '../../../DTOs/Rankmark/rankmark-dto';
import { UpdateRankmarkService } from './update-rankmark-service';

export class UpdateRankmarkController {
    constructor(
        private UpdateRankmarkService : UpdateRankmarkService,
        private RankmarkDTO: IRankmarkDTO
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

        return res.json(this.RankmarkDTO.rankmarkToResponse(rankmarkOrError.getValue()));
    };
};