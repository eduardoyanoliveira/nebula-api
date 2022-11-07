import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { Like } from "../../domain/entities/Interactions/Like";
import { User } from "../../domain/entities/User";
import { IFindLikeByAuthorAndAnswerRepository } from "../../repositories/Like/like-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class FindLikeByAuthorAndAnswerRepository implements IFindLikeByAuthorAndAnswerRepository {
    async execute(author: User, answer: Answer): Promise<Result<Like>> {

        try {
            const response = await prismaClient.likes.findFirst({
                where:{
                    author_id: author.id,
                    answer_id: answer.id
                }
            });

            const { ...props } = response;
            const like : Like = Like.create(props);

            return Result.ok<Like>(like);

        } catch (error) {
            return Result.fail<Like>(error)
        };
   
    }; 
};