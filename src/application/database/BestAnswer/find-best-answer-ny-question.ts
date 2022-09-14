import { Result } from "../../core/Result";
import { BestAnswer } from "../../domain/entities/Interactions/BestAnswer";
import { IFindBestAnswerByQuestionRepository } from "../../repositories/BestAnswer/best-answer-repository";
import { prismaClient } from "../prisma/prismaClient";


export class FindBestAnswerByQuestionRepository implements IFindBestAnswerByQuestionRepository {
    async execute(questionId: string): Promise<Result<BestAnswer>> {
        try{
            const response = await prismaClient.bestAnswer.findFirst({
                where:{
                    question_id: questionId
                }
            });

            if(!response){
                return Result.fail('Best Answer does not exists');
            };

            const bestAnswer = BestAnswer.create(response);

            return Result.ok(bestAnswer);
        }catch(err){
            return Result.fail(err);
        };
    };
};