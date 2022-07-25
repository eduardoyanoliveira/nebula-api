import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";

export interface ICreateSubjectRepository {
    execute(subject: Subject) : Promise<Result<Subject>>,
};

export interface IUpdateSubjectRepository{
    execute(subject: Subject) : Promise<Result<Subject>>,
};

export interface IFindSubjectByIdRepository {
    execute(subject_id: string) : Promise<Result<Subject>>,
};

export interface IFindSubjectByNameRepository{
    execute(name: string) : Promise<Result<Subject>>,
};

export interface IListSubjectsRepository{
    execute(filters?: object) : Promise<Result<Subject[]>>,
};