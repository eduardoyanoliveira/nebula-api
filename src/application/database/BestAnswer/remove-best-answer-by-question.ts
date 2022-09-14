import { Result } from "../../core/Result";
import { BestAnswer } from "../../domain/entities/Interactions/BestAnswer";
import { IRemoveBestAnswerByQuestionRepository } from "../../repositories/BestAnswer/best-answer-repository";
import { prismaClient } from "../prisma/prismaClient";


export class RemoveBestAnswerByQuestionRepository implements IRemoveBestAnswerByQuestionRepository{

    async execute(questionId: string): Promise<Result<BestAnswer>> {
        
        try{
            const response = await prismaClient.bestAnswer.delete({
                where:{
                    question_id : questionId
                },
                select:{
                    answer_id: true,
                    question_id: true,
                    created_at: true
                }
            });

            const bestAnswer = BestAnswer.create(response);

            return Result.ok(bestAnswer);

        }catch(err){
            return Result.fail(err);
        };
    };
    
};