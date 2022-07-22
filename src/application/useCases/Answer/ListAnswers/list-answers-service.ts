import { Result } from "../../../../core/Result";
import { Answer } from "../../../../domain/entities/Interactions/Answer";
import { IAnswerRepository } from "../../../repositories/Answer/answer-repository";

interface IListAnswers {
    filters?: object
};

export class ListAnswersService {
    constructor(
        private AnswerRepository : IAnswerRepository
    ){};

    async execute({ filters } :IListAnswers ): Promise<Result<Answer[]>>{

        const answersOrError = await this.AnswerRepository.list(filters);

        if(answersOrError.isFailure){
            return Result.fail<Answer[]>(answersOrError.error);
        };

        return Result.ok<Answer[]>(answersOrError.getValue());
    }
}