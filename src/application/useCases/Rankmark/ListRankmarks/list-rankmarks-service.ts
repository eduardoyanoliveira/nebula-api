import { Result } from "../../../../core/Result";
import { Rankmark } from "../../../../domain/entities/Rankmark";
import { IRankmarkRepository } from "../../../repositories/Rankmark/rankmark-repository";

interface IListRankmarksRequest {
    filters?: object
};

export class ListRankmarksService {

    constructor(
        private RankmarkRepository: IRankmarkRepository
    ){}

    async execute({ filters } : IListRankmarksRequest): Promise<Result<Rankmark[]>> {

        const rankmarksOrError = await this.RankmarkRepository.list(filters);

        if(rankmarksOrError.isFailure){
            return Result.fail<Rankmark[]>(rankmarksOrError.error);
        };

        return Result.ok<Rankmark[]>(rankmarksOrError.getValue());
    };
};