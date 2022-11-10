import { Result } from '../../core/Result';
import { Like } from '../../domain/entities/Interactions/Like';
import { IRemoveLikeRepository } from '../../repositories/Like/like-repositories';
import { prismaClient } from "../prisma/prismaClient";


export class RemoveLikeRepository implements IRemoveLikeRepository {

    async execute(like: Like): Promise<Result<string>> {
        
        try {
            const response = await prismaClient.likes.delete({
                where:{
                    author_id_answer_id: { 
                        author_id: like.props.author.id ,
                        answer_id: like.props.answer.id
                    }
                }
            });

            return Result.ok<string>('Like has been successfully removed from database!')

        } catch (error) {
            
            return Result.fail<string>(error);
        };

    };
};