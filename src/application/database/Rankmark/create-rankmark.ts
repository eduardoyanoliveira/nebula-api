import { Result } from "../../core/Result";
import { Rankmark } from "../../domain/entities/Rankmark";
import { ICreateRankmarkRepository } from "../../repositories/Rankmark/rankmark-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class CreateRankmarkRepository implements ICreateRankmarkRepository{

    async execute(rankmark: Rankmark): Promise<Result<Rankmark>> {
        
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