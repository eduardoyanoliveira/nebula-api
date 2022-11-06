import { Result } from "../../../core/Result";
import { IFindAnswerByIdRepository } from "../../../repositories/Answer/answer-repositories";
import { IFindLikeByAuthorAndAnswerRepository, IRemoveLikeRepository } from "../../../repositories/Like/like-repositories";
import { IFindUserByIdRepository } from "../../../repositories/User/user-repositories";

interface IRemoveLikeRequest {
    userId: string,
    answerId: string 
};

export class RemoveLikeService {

    constructor(
        private FindUserByIdRepository: IFindUserByIdRepository,
        private FindAnswerByIdRepository: IFindAnswerByIdRepository,
        private FindLikeByAuthorAndAnswerRepository: IFindLikeByAuthorAndAnswerRepository,
        private RemoveLikeRepository: IRemoveLikeRepository,
    ){};

    async execute({ userId, answerId } : IRemoveLikeRequest): Promise<Result<string>> {

        const userResponse = await this.FindUserByIdRepository.execute(userId);

        if(userResponse.isFailure) return Result.fail<string>(userResponse.error);


        const answerResponse = await this.FindAnswerByIdRepository.execute(answerId);

        if(answerResponse.isFailure) return Result.fail<string>(answerResponse.error);
        

        const likeResponse = await this.FindLikeByAuthorAndAnswerRepository.execute(
            userResponse.getValue(), answerResponse.getValue()
        );

        if(likeResponse.isFailure) 
            return Result.fail<string>(likeResponse.error);
        
        const removeLikeReponse = await this.RemoveLikeRepository.execute(likeResponse.getValue());

        if(removeLikeReponse.isFailure) return Result.fail<string>(removeLikeReponse.error);

        return Result.ok<string>(removeLikeReponse.getValue());
    };
};