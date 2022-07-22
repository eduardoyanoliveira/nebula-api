import { Result } from "../../../../core/Result";
import { Content } from "../../../../domain/entities/Content";
import { IContentRepository } from "../../../repositories/Content/content-repository";

interface IListContentsRequest {
    filters?: object
};

export class ListContentsService {
    constructor(
        private ContentRepository: IContentRepository
    ){};

    async execute({ filters } : IListContentsRequest): Promise<Result<Content[]>> {

        const contentsOrError = await this.ContentRepository.list(filters);

        if(contentsOrError.isFailure){
            return Result.fail<Content[]>(contentsOrError.error);
        };

        return Result.ok<Content[]>(contentsOrError.getValue());

    };
};