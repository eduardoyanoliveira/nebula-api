import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { IDataToAnswer } from "../../DTOs/Answers/data-to-answer";
import { ICreateAnswerRepository } from "../../repositories/Answer/answer-repositories";
import { prismaClient } from '../prisma/prismaClient';

export class CreateAnswerRepository implements ICreateAnswerRepository{

    constructor(
        private DataToAnswer: IDataToAnswer
    ){};

    async execute(answer: Answer): Promise<Result<Answer>> {

        try{

            const response = await prismaClient.answer.create({
                data:{
                    id: answer.id,
                    text: answer.props.text,
                    question_id: answer.props.question.id,
                    author_id: answer.props.author.id,
                    created_at: answer.props.created_at,
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