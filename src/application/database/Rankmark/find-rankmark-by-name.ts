import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkDTO } from "../../DTOs/Rankmark/rankmark-dto";
import { IRankmarkRepository } from "../../repositories/Rankmark/rankmark-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IFindRankmarkByName extends Pick<IRankmarkRepository, 'findByName'>{};

export class FindRankmarkByName implements IFindRankmarkByName{

    constructor(
        private RankmarkDTO: IRankmarkDTO
    ){};

    async findByName(name: string): Promise<Result<Rankmark>> {

        const response = await prismaClient.rankmark.findUnique({
            where:{
                name
            }
        });

        if(!response){
            return Result.fail<Rankmark>('could not retrieve rankmark from database due an unexpected error');
        };

        return Result.ok<Rankmark>(this.RankmarkDTO.dataToRankmark(response));
    };
};