import { Result } from "../../../core/Result";
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

    async execute({userId, answerId} : IGetLikeByAuthorAndAnswerRequest): Promise<Result<boolean>> {
        
        const userResponse = await this.FindUserByIdRepository.execute(userId);

        if(userResponse.isFailure) return Result.fail<boolean>(userResponse.error);

        const answerResponse = await this.FindAnswerByIdRepository.execute(answerId);

        if(answerResponse.isFailure) return Result.fail<boolean>(answerResponse.error);

        const likeResponse = await this.FindLikeByAuthorAndAnswerRepository.execute(
            userResponse.getValue(), 
            answerResponse.getValue()
        );

        if(likeResponse.isFailure) return Result.fail<boolean>(likeResponse.error);
        
        return Result.ok<boolean>(likeResponse.getValue());
    };
};