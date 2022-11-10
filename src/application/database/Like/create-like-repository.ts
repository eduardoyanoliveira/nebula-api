import { Result } from "../../core/Result";
import { Like } from "../../domain/entities/Interactions/Like";
import { ICreateLikeRepository } from "../../repositories/Like/like-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class CreateLikeRepository implements ICreateLikeRepository {
    async execute(like: Like): Promise<Result<Like>> {

        try {
            const response = await prismaClient.likes.create({
                data:{
                    answer_id: like.props.answer.id,
                    author_id: like.props.author.id
                }
            });

            return Result.ok<Like>(like);

        } catch (error) {
            return Result.fail<Like>(`Could not register like on database due the following error: ${error}` );   
        };
       
    };
};