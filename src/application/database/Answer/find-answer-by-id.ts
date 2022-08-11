import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { IDataToAnswer } from "../../DTOs/Answers/data-to-answer";
import { IFindAnswerByIdRepository } from "../../repositories/Answer/answer-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class FindAnswerByIdRepository implements IFindAnswerByIdRepository{

    constructor(
        private DataToAnswer: IDataToAnswer
    ){};

    async execute(answer_id: string): Promise<Result<Answer>> {
        
        const response = await prismaClient.answer.findUnique({
            where:{
                id:answer_id
            },
            include:{
                author:true,
                question:{
                    include:{
                        author: true,
                        subject: true
                    }
                }
            }
        });

        if(!response){
            return Result.fail<Answer>('Could not find the answer by the given id');
        };

        const answer = this.DataToAnswer.transform(response);

        return Result.ok<Answer>(answer);
    };  
};