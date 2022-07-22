import { IRankmarkRepository } from "../../../application/repositories/Rankmark/rankmark-repository";
import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";

export class InMemoryRankmarkRepository implements IRankmarkRepository {

    public rankmarks : Rankmark[] = [];

    async create(rankmark: Rankmark): Promise<Result<Rankmark>> {

        this.rankmarks.push(rankmark);

        return Result.ok<Rankmark>(rankmark);
    };

    async update(rankmark: Rankmark): Promise<Result<Rankmark>> {

        const index = this.rankmarks.findIndex(item => item.id === rankmark.id);

        this.rankmarks[index] = rankmark;

        return Result.ok<Rankmark>(rankmark);
    };

    async findByName(name: string): Promise<Result<Rankmark>> {
        const rankmark = this.rankmarks.find(item => item.props.name === name);

        if(!rankmark){
            return Result.fail<Rankmark>('could not find a rankmark with the given name');
        }

        return Result.ok<Rankmark>(rankmark);
    };

    async findById(id: string): Promise<Result<Rankmark>> {

        const rankmark = this.rankmarks.find(item => item.id === id);

        if(!rankmark){
            return Result.fail<Rankmark>('could not find a rankmark with the given id');
        }

        return Result.ok<Rankmark>(rankmark);
    };

    async list(): Promise<Result<Rankmark[]>> {
        return Result.ok<Rankmark[]>(this.rankmarks);
    };

};