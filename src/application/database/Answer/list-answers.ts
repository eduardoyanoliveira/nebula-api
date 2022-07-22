import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { IAnswerDTO } from "../../DTOs/Answers/answer-dto";
import { IAnswerRepository } from "../../repositories/Answer/answer-repository";
import { prismaClient } from "../prisma/prismaClient";


interface IListAnswers extends Pick<IAnswerRepository, 'list'>{};

export class ListAnswers implements IListAnswers{

    constructor(
        private AnswerDTO: IAnswerDTO
    ){};
    
    async list(filters?: object | undefined): Promise<Result<Answer[]>> {
        

        const response = await prismaClient.answer.findMany({
            where: filters,
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

        const answers : Answer[] = [];

        response.forEach((answer) => {
            answers.push(this.AnswerDTO.dataToAnswer(answer));
        });

        return Result.ok<Answer[]>(answers);
    };
};