import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { IListAnswersRepository } from "../../../repositories/Answer/answer-repositories";
interface IListAnswers {
    filters?: object
};

export class ListAnswersService {
    constructor(
        private ListAnswersRepository : IListAnswersRepository
    ){};

    async execute({ filters } :IListAnswers ): Promise<Result<Answer[]>>{

        const answersOrError = await this.ListAnswersRepository.execute(filters);

        if(answersOrError.isFailure){
            return Result.fail<Answer[]>(answersOrError.error);
        };

        return Result.ok<Answer[]>(answersOrError.getValue());
    }
}