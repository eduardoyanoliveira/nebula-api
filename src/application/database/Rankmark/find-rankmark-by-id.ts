import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkDTO } from "../../DTOs/Rankmark/rankmark-dto";
import { IRankmarkRepository } from "../../repositories/Rankmark/rankmark-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IFindRankmarkById extends Pick<IRankmarkRepository, 'findById'>{};

export class FindRankmarkById implements IFindRankmarkById{

    constructor(
        private RankmarkDTO: IRankmarkDTO
    ){};

    async findById(id: string): Promise<Result<Rankmark>> {

        const response = await prismaClient.rankmark.findUnique({
            where:{
                id
            }
        });

        if(!response){
            return Result.fail<Rankmark>('could not retrieve rankmark from database due an unexpected error');
        };

        return Result.ok<Rankmark>(this.RankmarkDTO.dataToRankmark(response));
    };
};