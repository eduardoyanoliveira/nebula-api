import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";

export interface ICreateRankmarkRepository{
    execute(rankmark: Rankmark ) : Promise<Result<Rankmark>>,
};

export interface IUpdateRankmarkRepository{
    execute(rankmark: Rankmark) : Promise<Result<Rankmark>>,
};

export interface IFindRankmarkByNameRepository{
    execute(name: string) : Promise<Result<Rankmark>>,
};

export interface IFindRankmarkByIdRepository{
    execute(id: string) : Promise<Result<Rankmark>>,
};

export interface IListRankmarksRepository{
    execute(filters?: object): Promise<Result<Rankmark[]>>,
};