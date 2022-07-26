import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { IListQuestionsRepository } from "../../../repositories/Question/question-repositories";
interface IListQuestionRequest {
    filters?: object
};

export class ListQuestionsService {
    constructor(
        private ListQuestionsRepository: IListQuestionsRepository
    ){};

    async execute({ filters }: IListQuestionRequest) : Promise<Result<Question[]>>{

        const questionsOrError = await this.ListQuestionsRepository.execute(filters);

        if(questionsOrError.isFailure){
            return Result.fail<Question[]>(questionsOrError.error);
        };

        return Result.ok<Question[]>(questionsOrError.getValue());

    };
};