import { Result } from "../../core/Result";
import { Question } from "../../domain/entities/Interactions/Question";
import { IDataToQuestion } from "../../DTOs/Question/data-to-question";
import { IUpdateQuestionRepository } from "../../repositories/Question/question-repositories";

import { prismaClient } from '../prisma/prismaClient';

export class UpdateQuestionRepository implements IUpdateQuestionRepository{

    constructor(
        private DataToQuestion: IDataToQuestion
    ){};

    async execute(question: Question) : Promise<Result<Question>> {

        try{
            const response = await prismaClient.question.update({
                where:{
                    id: question.id
                },
                data:{
                    title: question.props.title,
                    text: question.props.text,
                    subject_id: question.props.subject.id,
                    is_public: question.props.is_public,
                    is_closed: question.props.is_closed,
                    updated_at: question.props.updated_at
                },
                include:{
                    author:true,
                    subject:true
                }
            });

            return Result.ok<Question>(this.DataToQuestion.transform(response));

        }catch(err){
            return Result.fail<Question>(err.message);
        };

    };
}; 