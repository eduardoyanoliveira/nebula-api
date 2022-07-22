import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";
import { IQuestionDTO } from "../../DTOs/Question/question-dto";
import { IQuestionRepository } from "../../repositories/Question/question-repository";
import { prismaClient } from "../prisma/prismaClient";

interface IListQuestions extends Pick<IQuestionRepository, 'list'>{};

export class ListQuestions implements IListQuestions{

    constructor(
        private QuestionDTO: IQuestionDTO
    ){};

    async list(filters): Promise<Result<Question[]>> {

        const response = await prismaClient.question.findMany({
            where: filters,
            include:{
                author: true,
                subject: true
            }
        });

        const questions : Question[] = [];

        response.forEach((item) => {
            questions.push(this.QuestionDTO.dataToQuestion(item));
        });

        return Result.ok<Question[]>(questions);
    };
};