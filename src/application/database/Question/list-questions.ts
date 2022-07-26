import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { IDataToQuestion } from "../../DTOs/Question/data-to-question";
import { IListQuestionsRepository } from "../../repositories/Question/question-repositories";
import { prismaClient } from "../prisma/prismaClient";

export class ListQuestionsRepository implements IListQuestionsRepository{

    constructor(
        private DataToQuestion: IDataToQuestion
    ){};

    async execute(filters): Promise<Result<Question[]>> {

        const response = await prismaClient.question.findMany({
            where: filters,
            include:{
                author: true,
                subject: true
            }
        });

        const questions : Question[] = [];

        response.forEach((item) => {
            questions.push(this.DataToQuestion.transform(item));
        });

        return Result.ok<Question[]>(questions);
    };
};