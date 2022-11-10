import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { ICountLikesByAnswerRepository } from "../../repositories/Like/like-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class CountLikesByAnswerRepository implements ICountLikesByAnswerRepository{

    async execute(answer: Answer): Promise<Result<number>> {

        try {
            const response = await prismaClient.likes.findMany({
                where: {
                    answer_id: answer.id
                }
            });

            return Result.ok<number>(response.length);
        } catch (error) {
            return Result.fail<number>(`Could not retrieve the likes on database due the following error: ${error}` );   
        };

    };
};