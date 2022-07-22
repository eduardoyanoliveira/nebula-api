import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { IAnswerRepository } from "../../repositories/Answer/answer-repository";
import { prismaClient } from '../prisma/prismaClient';

interface ICreateAnswer extends Pick<IAnswerRepository, 'create'>{};

export class CreateAnswer implements ICreateAnswer{

    async create(answer: Answer): Promise<Result<Answer>> {

        try{

            await prismaClient.answer.create({
                data:{
                    id: answer.id,
                    text: answer.props.text,
                    question_id: answer.props.question.id,
                    author_id: answer.props.author.id,
                    created_at: answer.props.created_at,
                    updated_at: answer.props.updated_at
                }
            });
            
            return Result.ok<Answer>(answer);

        }catch(err){
            return Result.fail<Answer>(err.message);
        };
    };
};