import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { IListRankmarksRepository } from "../../../repositories/Rankmark/rankmark-repositories";

interface IListRankmarksRequest {
    filters?: object
};

export class ListRankmarksService {

    constructor(
        private ListRankmarksReposoitory: IListRankmarksRepository
    ){}

    async execute({ filters } : IListRankmarksRequest): Promise<Result<Rankmark[]>> {

        const rankmarksOrError = await this.ListRankmarksReposoitory.execute(filters);

        if(rankmarksOrError.isFailure){
            return Result.fail<Rankmark[]>(rankmarksOrError.error);
        };

        return Result.ok<Rankmark[]>(rankmarksOrError.getValue());
    };
};