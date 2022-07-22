import { Request, Response } from "express";
import { IRankmarkDTO } from "../../../DTOs/Rankmark/rankmark-dto";
import { CreateRankmarkService } from "./create-rankmark-service";

export class CreateRankmarkController {

    constructor(
        private CreateRankmarkService: CreateRankmarkService,
        private RankmarkDTO: IRankmarkDTO
    ){};

    async handle(req: Request, res: Response) {

        const { name, color, points } = req.body;

        const rankmarkOrError = await this.CreateRankmarkService.execute({ name, color, points });

        if(rankmarkOrError.isFailure){
            throw new Error(rankmarkOrError.error);
        };

        return res.json(this.RankmarkDTO.rankmarkToResponse(rankmarkOrError.getValue()));
    };
};