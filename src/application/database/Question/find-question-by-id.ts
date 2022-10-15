import { Result } from "../../core/Result";
import { Question } from "../../domain/entities/Interactions/Question";
import { IDataToQuestion } from "../../DTOs/Question/data-to-question";
import { IFindQuestionByIdRepository } from "../../repositories/Question/question-repositories";
import { prismaClient } from "../prisma/prismaClient";


export class FindQuestionByIdRepository implements IFindQuestionByIdRepository{

    constructor(
        private DataToQuestion : IDataToQuestion
    ){};

    async execute(question_id: string): Promise<Result<Question>> {
        
        const response = await prismaClient.question.findUnique({
            where:{
                id: question_id
            },
            include:{
                author: true, 
                subject:true,
                best_answers: true
            }
        });

        if(!response){
            return Result.fail<Question>('Could not find the question on database');
        };

        const question = this.DataToQuestion.transform(response);

        return Result.ok<Question>(question);
    }; 
};