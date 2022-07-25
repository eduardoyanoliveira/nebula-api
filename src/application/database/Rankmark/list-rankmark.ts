import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IDataToRankmark } from "../../DTOs/Rankmark/data-to-rankmark";
import { IListRankmarksRepository } from "../../repositories/Rankmark/rankmark-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class ListRankmarksRepository implements IListRankmarksRepository{

    constructor(
        private DataToRankmark: IDataToRankmark
    ){};

    async execute(filters): Promise<Result<Rankmark[]>> {

        const response = await prismaClient.rankmark.findMany({
            where: filters
        });

        if(!response){
            return Result.fail<Rankmark[]>('Could not retrieve the rankmark list due an unexpected error');
        };

        const rankmarks : Rankmark[] = [];

        response.forEach((rankmark) => {
            rankmarks.push(this.DataToRankmark.transform(rankmark));
        });
        
        return Result.ok<Rankmark[]>(rankmarks);
    };
};