import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { IListContentsRepository } from "../../../repositories/Content/content-repositories";

interface IListContentsRequest {
    filters?: object
};

export class ListContentsService {
    constructor(
        private ListContentsRepository: IListContentsRepository
    ){};

    async execute({ filters } : IListContentsRequest): Promise<Result<Content[]>> {

        const contentsOrError = await this.ListContentsRepository.execute(filters);

        if(contentsOrError.isFailure){
            return Result.fail<Content[]>(contentsOrError.error);
        };

        return Result.ok<Content[]>(contentsOrError.getValue());

    };
};