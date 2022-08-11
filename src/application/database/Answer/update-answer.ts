import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { IDataToAnswer } from "../../DTOs/Answers/data-to-answer";
import { IUpdateAnswerRepository } from "../../repositories/Answer/answer-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class UpdateAnswerRepository implements IUpdateAnswerRepository{

    constructor(
        private DataToAnswer: IDataToAnswer
    ){};
    
    async execute(answer: Answer): Promise<Result<Answer>> {
        try{
            
            const response = await prismaClient.answer.update({
                where: {
                    id: answer.id
                },
                data:{
                    text: answer.props.text,
                    question_id: answer.props.question.id,
                    updated_at: answer.props.updated_at
                },
                include:{
                    author:true,
                    question: {
                        include:{
                            author:true,
                            subject: true
                        }
                    }
                }
            });
            
            return Result.ok<Answer>(this.DataToAnswer.transform(response));

        }catch(err){
            return Result.fail<Answer>(err.message);
        };
    };  
};