import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { IQuestionRepository } from "../../repositories/Question/question-repository";
import { IQuestionDTO } from '../../DTOs/Question/question-dto';
import { prismaClient } from "../prisma/prismaClient";

interface IFindQuestionById extends Pick<IQuestionRepository, 'findById'>{};

export class FindQuestionById implements IFindQuestionById{

    constructor(
        private QuestionDTO : IQuestionDTO
    ){};

    async findById(question_id: string): Promise<Result<Question>> {
        
        const response = await prismaClient.question.findUnique({
            where:{
                id: question_id
            },
            include:{
                author: true, 
                subject:true
            }
        });

        if(!response){
            return Result.fail<Question>('Could not find the question on database');
        };

        const question = this.QuestionDTO.dataToQuestion(response);

        return Result.ok<Question>(question);
    }; 
};