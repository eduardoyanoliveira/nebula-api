import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IDataToRankmark } from "../../DTOs/Rankmark/data-to-rankmark";
import { IFindRankmarkByNameRepository } from "../../repositories/Rankmark/rankmark-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class FindRankmarkByNameRepository implements IFindRankmarkByNameRepository{

    constructor(
        private DataToRankmark: IDataToRankmark
    ){};

    async execute(name: string): Promise<Result<Rankmark>> {

        const response = await prismaClient.rankmark.findUnique({
            where:{
                name
            }
        });

        if(!response){
            return Result.fail<Rankmark>('could not retrieve rankmark from database due an unexpected error');
        };

        return Result.ok<Rankmark>(this.DataToRankmark.transform(response));
    };
};