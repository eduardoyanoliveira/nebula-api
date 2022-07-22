import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";

export interface IRankmarkRepository {
    create(rankmark: Rankmark ) : Promise<Result<Rankmark>>,
    update(rankmark: Rankmark) : Promise<Result<Rankmark>>,
    findByName(name: string) : Promise<Result<Rankmark>>,
    findById(id: string) : Promise<Result<Rankmark>>,
    list(filters?: object): Promise<Result<Rankmark[]>>,
};