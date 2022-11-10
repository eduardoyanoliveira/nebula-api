import { Result } from "../../../core/Result";
import { IFindAnswerByIdRepository } from "../../../repositories/Answer/answer-repositories";
import { ICountLikesByAnswerRepository } from "../../../repositories/Like/like-repositories";

interface ICountLikesByAnswerRequest {
    answerId: string
};

export class CountLikesByAnswerService {

    constructor(
        private FindAnswerByIdRepository : IFindAnswerByIdRepository,
        private CountLikesByAnswerRepository: ICountLikesByAnswerRepository
    ){};

    async execute({ answerId } : ICountLikesByAnswerRequest): Promise<Result<number>> {
        
        const answerResponse = await this.FindAnswerByIdRepository.execute(answerId);
        
        if(answerResponse.isFailure) return Result.fail<number>(answerResponse.error);

        const likesResponse = await this.CountLikesByAnswerRepository.execute(answerResponse.getValue());

        if(likesResponse.isFailure) return Result.fail<number>(likesResponse.error);

        return Result.ok<number>(likesResponse.getValue());
    };  
};