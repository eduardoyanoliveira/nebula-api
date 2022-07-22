import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";

export interface ISubjectRepository {
    create(subject: Subject) : Promise<Result<Subject>>,
    update(subject: Subject) : Promise<Result<Subject>>,
    findById(subject_id: string) : Promise<Result<Subject>>,
    findByName(name: string) : Promise<Result<Subject>>,
    list(filters?: object) : Promise<Result<Subject[]>>,
};