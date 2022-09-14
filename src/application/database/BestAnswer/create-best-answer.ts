import { Result } from "../../core/Result";
import { BestAnswer } from "../../domain/entities/Interactions/BestAnswer";
import { ICreateBestAnswerRepository } from "../../repositories/BestAnswer/best-answer-repository";
import { prismaClient } from '../prisma/prismaClient';

export class CreateBestAnswerRepository implements ICreateBestAnswerRepository {

    async execute(bestAnswer: BestAnswer): Promise<Result<BestAnswer>> {

        try{
            const response = await prismaClient.bestAnswer.create({
                data: {
                    question_id: bestAnswer.props.question.id,
                    answer_id: bestAnswer.props.answer.id,
                    created_at: bestAnswer.props.created_at
                }
            });

            return Result.ok(bestAnswer);
        }catch(err){
            return Result.fail(err);
        };

    };
};