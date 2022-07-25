import { Request, Response } from "express";
import { IRankmarkToResponse } from "../../../DTOs/Rankmark/rankmark-to-response";
import { CreateRankmarkService } from "./create-rankmark-service";

export class CreateRankmarkController {

    constructor(
        private CreateRankmarkService: CreateRankmarkService,
        private RankmarkToResponse: IRankmarkToResponse
    ){};

    async handle(req: Request, res: Response) {

        const { name, color, points } = req.body;

        const rankmarkOrError = await this.CreateRankmarkService.execute({ name, color, points });

        if(rankmarkOrError.isFailure){
            throw new Error(rankmarkOrError.error);
        };

        return res.json(this.RankmarkToResponse.transform(rankmarkOrError.getValue()));
    };
};