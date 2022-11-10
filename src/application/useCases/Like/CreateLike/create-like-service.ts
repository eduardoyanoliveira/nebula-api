import { Result } from "../../../core/Result";
import { Like } from "../../../domain/entities/Interactions/Like";
import { ICreateLikeRepository, IFindLikeByAuthorAndAnswerRepository } from "../../../repositories/Like/like-repositories";
import { IFindAnswerByIdRepository } from "../../../repositories/Answer/answer-repositories";
import { IFindUserByIdRepository } from '../../../repositories/User/user-repositories';


interface ICreateLikeRequest {
    userId: string,
    answerId: string
};

export class CreateLikeService {

    constructor(
        private FindUserByIdRepository: IFindUserByIdRepository,
        private FindAnswerByIdRepository: IFindAnswerByIdRepository,
        private FindLikeByAuthorAndAnswerRepository: IFindLikeByAuthorAndAnswerRepository,
        private CreateLikeRepository: ICreateLikeRepository
    ){};

    async execute({ userId, answerId } : ICreateLikeRequest): Promise<Result<Like>> {

        const userResponse = await this.FindUserByIdRepository.execute(userId);

        if(userResponse.isFailure) return Result.fail<Like>(userResponse.error);

        const answerResponse = await this.FindAnswerByIdRepository.execute(answerId);

        if(answerResponse.isFailure) return Result.fail<Like>(answerResponse.error);

        const likeAlreadyExists = await this.FindLikeByAuthorAndAnswerRepository.execute(
            userResponse.getValue(), answerResponse.getValue()
        );

        console.log(likeAlreadyExists)

        if(likeAlreadyExists.isSuccess) 
            return Result.fail<Like>('This user already gaved a like to this answer');
        

        const like = Like.create({ author: userResponse.getValue(), answer: answerResponse.getValue()});

        
        // Persists on database 

        const likeCreationResponse = await this.CreateLikeRepository.execute(like);

        if(likeCreationResponse.isFailure) return Result.fail<Like>(likeCreationResponse.error);

        return Result.ok<Like>(like);
    };
};