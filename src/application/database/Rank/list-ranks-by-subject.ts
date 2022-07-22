import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { IRankDTO } from "../../DTOs/Rank/rank-dto";
import { IRankRepository } from "../../repositories/Rank/rank-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IListRanksBySubject extends Pick<IRankRepository, 'listRanksBySubject'>{};

export class ListRanksBySubject implements IListRanksBySubject {

    constructor(
        private RankDTO: IRankDTO
    ){};
    
    async listRanksBySubject(subject_id: string): Promise<Result<Rank[]>> {

        const response = await prismaClient.rank.findMany({
            where:{
                subject_id
            },
            include:{
                user: true,
                subject: true
            }
        });

        if(!response){
            return Result.fail<Rank[]>('Could not retrieve the subject rank');
        };

        const ranks: Rank[] =[];

        response.forEach((rank) => {
            ranks.push(this.RankDTO.dataToRank(rank));
        });

        return Result.ok<Rank[]>(ranks);
    };

};