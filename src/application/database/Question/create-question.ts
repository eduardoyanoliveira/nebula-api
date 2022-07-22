import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { IQuestionRepository } from "../../repositories/Question/question-repository";
import { prismaClient } from '../prisma/prismaClient';


interface ICreateQuestion extends Pick<IQuestionRepository, 'create'>{};

export class CreateQuestion implements ICreateQuestion{

    async create(question: Question) : Promise<Result<Question>> {

        try{
            await prismaClient.question.create({
                data:{
                    id: question.id,
                    title: question.props.title,
                    text: question.props.text,
                    author_id: question.props.author.id,
                    subject_id: question.props.subject.id,
                    is_public: question.props.is_public,
                    is_closed: question.props.is_closed,
                    created_at: question.props.created_at,
                    updated_at: question.props.updated_at
                }
            });

            return Result.ok<Question>(question)

        }catch(err){
            return Result.fail<Question>(err.message);
        };

    };
}; 