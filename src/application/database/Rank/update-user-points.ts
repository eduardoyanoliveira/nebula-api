import { Result } from "../../core/Result";
import { Rank } from "../../domain/entities/Rank";
import { IUpdateUserPointsRepository } from "../../repositories/Rank/rank-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class UpdateUserPointsRepository implements IUpdateUserPointsRepository {

    async execute(rank: Rank): Promise<Result<Rank>> {

        const data = await prismaClient.rank.update({
            where:{
                user_id_subject_id: {
                    user_id: rank.user.id,
                    subject_id: rank.subject.id
                }
            },
            data:{
                points: rank.points
            }
        });

        if(!data){
            return Result.fail<Rank>('Unexpected error on updating user in database');
        };

        return Result.ok<Rank>(rank);
    };
};