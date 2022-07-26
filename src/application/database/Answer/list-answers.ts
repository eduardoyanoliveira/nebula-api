import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { IDataToAnswer } from "../../DTOs/Answers/data-to-answer";
import { IListAnswersRepository } from "../../repositories/Answer/answer-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class ListAnswersRepository implements IListAnswersRepository{

    constructor(
        private DataToAnswer: IDataToAnswer
    ){};
    
    async execute(filters?: object | undefined): Promise<Result<Answer[]>> {
        

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
            answers.push(this.DataToAnswer.transform(answer));
        });

        return Result.ok<Answer[]>(answers);
    };
};