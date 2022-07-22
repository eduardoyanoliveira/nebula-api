import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { IQuestionDTO } from "../../DTOs/Question/question-dto";
import { IQuestionRepository } from "../../repositories/Question/question-repository";
import { prismaClient } from '../prisma/prismaClient';


interface IUpdateQuestion extends Pick<IQuestionRepository, 'update'>{};

export class UpdateQuestion implements IUpdateQuestion{

    constructor(
        private QuestionDTO: IQuestionDTO
    ){};

    async update(question: Question) : Promise<Result<Question>> {

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

            return Result.ok<Question>(this.QuestionDTO.dataToQuestion(response));

        }catch(err){
            return Result.fail<Question>(err.message);
        };

    };
}; 