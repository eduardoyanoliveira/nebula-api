import { Result } from "../../../core/Result";
import { IRemoveBestAnswerByQuestionRepository } from "../../../repositories/BestAnswer/best-answer-repository";
import { IFindQuestionByIdRepository } from "../../../repositories/Question/question-repositories";

interface IRemoveBestAnswerByQuestionRequest {
    questionId: string
};


export class RemoveBestAnswerByQuestionService {

    constructor(
        private FindQuestionByIdRepository: IFindQuestionByIdRepository,
        private RemoveBestAnswerByQuestionRepository: IRemoveBestAnswerByQuestionRepository
    ){};

    async execute({ questionId } : IRemoveBestAnswerByQuestionRequest ){

        const questionResponse = await this.FindQuestionByIdRepository.execute(questionId);

        if(questionResponse.isFailure){
            return Result.fail(questionResponse.error);
        };

        const response = await this.RemoveBestAnswerByQuestionRepository.execute(questionResponse.getValue().id);

        if(response.isFailure){
            return Result.fail(response.error);
        };

        return Result.ok(response.getValue());
    };
};