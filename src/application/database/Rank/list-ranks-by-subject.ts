import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { IListRanksBySubjectRepository } from "../../repositories/Rank/rank-repositories";
import { prismaClient } from "../prisma/prismaClient";
import { IDataToRank } from '../../DTOs/Rank/data-to-rank';

export class ListRanksBySubjectRepository implements IListRanksBySubjectRepository {

    constructor(
        private DataToRank: IDataToRank
    ){};
    
    async execute(subject_id: string): Promise<Result<Rank[]>> {

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
            ranks.push(this.DataToRank.transform(rank));
        });

        return Result.ok<Rank[]>(ranks);
    };

};