import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { IAnswerRepository } from "../../repositories/Answer/answer-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IUpdateAnswer extends Pick<IAnswerRepository, 'update'>{};

export class UpdateAnswer implements IUpdateAnswer{

    async update(answer: Answer): Promise<Result<Answer>> {
        try{
            
            await prismaClient.answer.update({
                where: {
                    id: answer.id
                },
                data:{
                    text: answer.props.text,
                    question_id: answer.props.question.id,
                    updated_at: answer.props.updated_at
                }
            });
            
            return Result.ok<Answer>(answer);

        }catch(err){
            return Result.fail<Answer>(err.message);
        };
    };  
};