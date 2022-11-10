import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { User } from "../../domain/entities/User";
import { IFindLikeByAuthorAndAnswerRepository } from "../../repositories/Like/like-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class FindLikeByAuthorAndAnswerRepository implements IFindLikeByAuthorAndAnswerRepository {
    async execute(author: User, answer: Answer): Promise<Result<boolean>> {

        try {
            const response = await prismaClient.likes.findFirst({
                where:{
                    author_id: author.id,
                    answer_id: answer.id
                },
                include:{
                    answer:{
                      
                    },
                    author:{
                    
                    }
                },
            });

            if(!response) return Result.fail<boolean>("Like not found");

            return Result.ok<boolean>(true);

        } catch (error) {
            return Result.fail<boolean>(error);
        };
   
    }; 
};