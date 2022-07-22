import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkRepository } from "../../repositories/Rankmark/rankmark-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IUpdateRankmark extends Pick<IRankmarkRepository, 'update'>{};

export class UpdateRankmark implements IUpdateRankmark{

    async update(rankmark: Rankmark): Promise<Result<Rankmark>> {
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