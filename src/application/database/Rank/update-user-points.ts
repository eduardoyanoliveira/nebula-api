import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { IRankRepository } from "../../repositories/Rank/rank-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IUpdateUserPointsProps extends Pick<IRankRepository, 'updateUserPoints'>{}; 

export class UpdateUserPoints implements IUpdateUserPointsProps {

    async updateUserPoints(rank: Rank): Promise<Result<Rank>> {

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