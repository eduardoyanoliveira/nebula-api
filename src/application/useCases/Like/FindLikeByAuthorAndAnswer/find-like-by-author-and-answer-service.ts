import { Result } from "../../../core/Result";
import { Like } from "../../../domain/entities/Interactions/Like";
import { IFindAnswerByIdRepository } from "../../../repositories/Answer/answer-repositories";
import { IFindLikeByAuthorAndAnswerRepository } from "../../../repositories/Like/like-repositories";
import { IFindUserByIdRepository } from '../../../repositories/User/user-repositories';

interface IGetLikeByAuthorAndAnswerRequest {
    userId: string,
    answerId: string
};

export class FindLikeByAuthorAndAnswerService {

    constructor(
        private FindUserByIdRepository: IFindUserByIdRepository,
        private FindAnswerByIdRepository: IFindAnswerByIdRepository,
        private FindLikeByAuthorAndAnswerRepository: IFindLikeByAuthorAndAnswerRepository
    ){};

    async execute({userId, answerId} : IGetLikeByAuthorAndAnswerRequest): Promise<Result<Like>> {
        
        const userResponse = await this.FindUserByIdRepository.execute(userId);

        if(userResponse.isFailure) return Result.fail<Like>(userResponse.error);

        const answerResponse = await this.FindAnswerByIdRepository.execute(answerId);

        if(answerResponse.isFailure) return Result.fail<Like>(answerResponse.error);

        const likeResponse = await this.FindLikeByAuthorAndAnswerRepository.execute(
            userResponse.getValue(), 
            answerResponse.getValue()
        );

        if(likeResponse.isFailure) return Result.fail<Like>(likeResponse.error);
        
        return Result.ok<Like>(likeResponse.getValue());
    };
};