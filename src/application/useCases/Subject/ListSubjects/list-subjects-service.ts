import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { ISubjectRepository } from "../../../repositories/Subject/subject-repository";

interface IListSubjectsRequest{
    filters?: object
};

export class ListSubjectsService {
    constructor(
        private SubjectRepository : ISubjectRepository,
    ){};

    async execute({ filters } : IListSubjectsRequest) : Promise<Result<Subject[]>>{
        return await this.SubjectRepository.list(filters);
    };
};