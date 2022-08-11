import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { IListSubjectsRepository } from "../../../repositories/Subject/subject-repositories";

interface IListSubjectsRequest{
    filters?: object
};

export class ListSubjectsService {
    constructor(
        private ListSubjectsRepository : IListSubjectsRepository,
    ){};

    async execute({ filters } : IListSubjectsRequest) : Promise<Result<Subject[]>>{
        return await this.ListSubjectsRepository.execute(filters);
    };
};