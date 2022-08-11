import { ICreateRankmarkRepository, IFindRankmarkByIdRepository, IFindRankmarkByNameRepository, IListRankmarksRepository, IUpdateRankmarkRepository } from "../../../repositories/Rankmark/rankmark-repositories";
import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";

export const inMemoryRankmarks : Rankmark[] = [];
export class InMemoryCreateRankmarkRepository implements ICreateRankmarkRepository{
    async execute(rankmark: Rankmark): Promise<Result<Rankmark>> {

        inMemoryRankmarks.push(rankmark);

        return Result.ok<Rankmark>(rankmark);
    };
};

export class InMemoryUpdateRankmarkRepository implements IUpdateRankmarkRepository{

    async execute(rankmark: Rankmark): Promise<Result<Rankmark>> {

        const index = inMemoryRankmarks.findIndex(item => item.id === rankmark.id);

        inMemoryRankmarks[index] = rankmark;

        return Result.ok<Rankmark>(rankmark);
    };
};

export class InMemoryFindRankmarkByNameRepository implements IFindRankmarkByNameRepository{

    async execute(name: string): Promise<Result<Rankmark>> {
        const rankmark = inMemoryRankmarks.find(item => item.props.name === name);

        if(!rankmark){
            return Result.fail<Rankmark>('could not find a rankmark with the given name');
        }

        return Result.ok<Rankmark>(rankmark);
    };
};
export class InMemoryFindRankmarkByIdRepository implements IFindRankmarkByIdRepository{
    async execute(id: string): Promise<Result<Rankmark>> {

        const rankmark = inMemoryRankmarks.find(item => item.id === id);

        if(!rankmark){
            return Result.fail<Rankmark>('could not find a rankmark with the given id');
        }

        return Result.ok<Rankmark>(rankmark);
    };
};


export class InMemoryListRankmarksRepository implements IListRankmarksRepository {

    async execute(): Promise<Result<Rankmark[]>> {
        return Result.ok<Rankmark[]>(inMemoryRankmarks);
    };

};