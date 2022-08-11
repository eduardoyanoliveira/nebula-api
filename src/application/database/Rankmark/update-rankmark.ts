import { Result } from "../../core/Result";
import { Rankmark } from "../../domain/entities/Rankmark";
import { IUpdateRankmarkRepository } from "../../repositories/Rankmark/rankmark-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class UpdateRankmarkRepository implements IUpdateRankmarkRepository{

    async execute(rankmark: Rankmark): Promise<Result<Rankmark>> {
        try{
            await prismaClient.rankmark.update({
                where:{
                    id: rankmark.id
                },
                data:{
                    ...rankmark.props
                }
            });

            return Result.ok<Rankmark>(rankmark);

        }catch(err){
            return Result.fail<Rankmark>('Could not update the rankmark due an unexpected error');
        };
    };
};