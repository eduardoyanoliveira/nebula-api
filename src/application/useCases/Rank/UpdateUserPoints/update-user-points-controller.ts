import { Request, Response } from "express";
import { IRankToResponse } from "../../../DTOs/Rank/rank-to-response";
import { UpdateUserPointsService } from "./update-user-points-service";


export class UpdateUserPointsController {
    constructor(
        private UpdateUserPointsService: UpdateUserPointsService,
        private RankToResponse: IRankToResponse
    ){};

    async handle(req: Request, res: Response){
        const { user_id, subject_id, points } = req.body;

        const rankOrError = await this.UpdateUserPointsService.execute({
            user_id,
            subject_id,
            points
        });

        if(rankOrError.isFailure){
            throw new Error(rankOrError.error);
        };

        return res.json(this.RankToResponse.transform(rankOrError.getValue()));
    };
};