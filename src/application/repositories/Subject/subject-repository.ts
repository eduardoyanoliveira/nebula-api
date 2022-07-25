import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";

export interface ISubjectRepository {
    create(subject: Subject) : Promise<Result<Subject>>,
    update(subject: Subject) : Promise<Result<Subject>>,
    findById(subject_id: string) : Promise<Result<Subject>>,
    findByName(name: string) : Promise<Result<Subject>>,
    list(filters?: object) : Promise<Result<Subject[]>>,
};

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