import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { IQuestionRepository } from "../../../repositories/Question/question-repository";

interface IListQuestionRequest {
    filters?: object
};

export class ListQuestionsService {
    constructor(
        private QuestionRepository: IQuestionRepository
    ){};

    async execute({ filters }: IListQuestionRequest) : Promise<Result<Question[]>>{

        const questionsOrError = await this.QuestionRepository.list(filters);

        if(questionsOrError.isFailure){
            return Result.fail<Question[]>(questionsOrError.error);
        };

        return Result.ok<Question[]>(questionsOrError.getValue());

    };
};