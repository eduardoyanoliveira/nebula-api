import { Result } from "../../core/Result";
import { BestAnswer } from "../../domain/entities/Interactions/BestAnswer";
import { User } from "../../domain/entities/User";
import { IListBestAnswerByAuthorRepository } from "../../repositories/BestAnswer/best-answer-repository";
import { prismaClient } from "../prisma/prismaClient";


export class ListBestAnswersByAuthorRepository implements IListBestAnswerByAuthorRepository {

    async execute(author: User): Promise<Result<BestAnswer[]>> {
        
        try{
            const response = await prismaClient.bestAnswer.findMany({
                where:{
                    answer : {
                        author_id : author.id
                    }
                }
            });

            const bestAnswers : BestAnswer[] = [];

            response.forEach(element => {
                const bestAnswer = BestAnswer.create(element);
                bestAnswers.push(bestAnswer);
            });

            return Result.ok(bestAnswers);

        }catch(err){
            return Result.fail(err);
        };
       
    };
};