import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkDTO } from "../../DTOs/Rankmark/rankmark-dto";
import { IRankmarkRepository } from "../../repositories/Rankmark/rankmark-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IListRankmark extends Pick<IRankmarkRepository, 'list'>{};

export class ListRankmark implements IListRankmark{

    constructor(
        private RankmarkDTO: IRankmarkDTO
    ){};

    async list(filters): Promise<Result<Rankmark[]>> {

        const response = await prismaClient.rankmark.findMany({
            where: filters
        });

        if(!response){
            return Result.fail<Rankmark[]>('Could not retrieve the rankmark list due an unexpected error');
        };

        const rankmarks : Rankmark[] = [];

        response.forEach((rankmark) => {
            rankmarks.push(this.RankmarkDTO.dataToRankmark(rankmark));
        });
        
        return Result.ok<Rankmark[]>(rankmarks);
    };
};