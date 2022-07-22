import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkRepository } from "../../repositories/Rankmark/rankmark-repository";
import { prismaClient } from "../prisma/prismaClient";

interface ICreateRankmark extends Pick<IRankmarkRepository, 'create'>{};

export class CreateRankmark implements ICreateRankmark{

    async create(rankmark: Rankmark): Promise<Result<Rankmark>> {
        
        try{
            const response = await prismaClient.rankmark.create({
                data:{
                    id: rankmark.id,
                    ...rankmark.props
                }
            });
    
            return Result.ok<Rankmark>(rankmark);
        }catch(err){
            return Result.fail<Rankmark>(err.message);
        }
    };
};