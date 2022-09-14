import { Result } from "../../../core/Result";
import { BestAnswer } from "../../../domain/entities/Interactions/BestAnswer";
import { IListBestAnswerByAuthorRepository } from "../../../repositories/BestAnswer/best-answer-repository";
import { IFindUserByIdRepository } from "../../../repositories/User/user-repositories";

interface IListBestAnswerByAutherRequest {
    author_id: string,
};

export class ListBestAnswersByAuthorService {
    constructor(
        private FindUserByIdRepository: IFindUserByIdRepository,
        private ListBestAnswersByAuthorRepository: IListBestAnswerByAuthorRepository
    ){};

    async execute({ author_id } : IListBestAnswerByAutherRequest) : Promise<Result<BestAnswer[]>>{

        const authorReponse = await this.FindUserByIdRepository.execute(author_id);

        if(authorReponse.isFailure){
            return Result.fail(authorReponse.error);
        };

        const response = await this.ListBestAnswersByAuthorRepository.execute(authorReponse.getValue());

        if(response.isFailure){
            return Result.fail(response.error);
        };

        return Result.ok(response.getValue());

    };
};