import { Result } from "../../../core/Result";
import { BestAnswer } from "../../../domain/entities/Interactions/BestAnswer";
import { IFindBestAnswerByQuestionRepository } from "../../../repositories/BestAnswer/best-answer-repository";
import { IFindQuestionByIdRepository } from "../../../repositories/Question/question-repositories";

interface IFindBestAnswerByQuestionRequest {
    questionId: string
};

export class FindBestAnswerByQuestionService {
    constructor(
        private FindQuestionByIdRepository: IFindQuestionByIdRepository,
        private FindBestAnswerByQuestionRepository: IFindBestAnswerByQuestionRepository
    ){};

    async execute({ questionId } : IFindBestAnswerByQuestionRequest) : Promise<Result<BestAnswer>> {

        const questionResponse = await this.FindQuestionByIdRepository.execute(questionId);

        if(questionResponse.isFailure){
            return Result.fail(questionResponse.error);
        };

        const response = await this.FindBestAnswerByQuestionRepository.execute(questionResponse.getValue().id);

        if(response.isFailure){
            return Result.fail(response.error);
        };

        return Result.ok(response.getValue());
    };
};