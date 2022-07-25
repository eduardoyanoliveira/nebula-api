import { ICreateSubjectRepository, IFindSubjectByIdRepository, IFindSubjectByNameRepository, IListSubjectsRepository, IUpdateSubjectRepository } from '../../../application/repositories/Subject/subject-repositories';
import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";

export const inMemorySubjects : Subject[] = [];
export class InMemoryCreateSubjectRepository implements ICreateSubjectRepository {

    async execute(subject: Subject): Promise<Result<Subject>> {
       
        inMemorySubjects.push(subject);

        return Result.ok<Subject>(subject);
    };
};

export class InMemoryUpdateSubjectRepository implements IUpdateSubjectRepository{
    async execute(subject: Subject): Promise<Result<Subject>> {

        const index = inMemorySubjects.findIndex(item => item.id === subject.id);

        inMemorySubjects[index] = subject;

        return Result.ok<Subject>(subject);
    };
};

export class InMemoryFindSubjectByIdRepository implements IFindSubjectByIdRepository{

    async execute(id: string): Promise<Result<Subject>> {
        const subject = inMemorySubjects.find(sub => sub.id === id);

        if(!subject){
            return Result.fail<Subject>("Couldn't find an subject with the given id");
        };

        return Result.ok<Subject>(subject);
    };
};

export class InMemoryFindSubjectByNameRepository implements IFindSubjectByNameRepository{

    async execute(name: string): Promise<Result<Subject>> {

        const subject = inMemorySubjects.find(sub => sub.props.name === name);

        if(!subject){
            return Result.fail<Subject>("Couldn't find an subject with the given name");
        };

        return Result.ok<Subject>(subject);
    }; 
};

export class InMemoryListSubjectsRepository implements IListSubjectsRepository{

    async execute(): Promise<Result<Subject[]>> {
        return Result.ok<Subject[]>(inMemorySubjects);
    };
};
