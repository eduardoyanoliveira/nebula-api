import { ISubjectRepository } from "../../../application/repositories/Subject/subject-repository";
import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";

export class InMemorySubjectRepo implements ISubjectRepository{

    public subjects : Subject[] = []

    async create(subject: Subject): Promise<Result<Subject>> {
       
        this.subjects.push(subject);

        return Result.ok<Subject>(subject);
    };

    async update(subject: Subject): Promise<Result<Subject>> {

        const index = this.subjects.findIndex(item => item.id === subject.id);

        this.subjects[index] = subject;

        return Result.ok<Subject>(subject);
    };


    async findById(id: string): Promise<Result<Subject>> {
        const subject = this.subjects.find(sub => sub.id === id);

        if(!subject){
            return Result.fail<Subject>("Couldn't find an subject with the given id");
        };

        return Result.ok<Subject>(subject);
    };

    async findByName(name: string): Promise<Result<Subject>> {

        const subject = this.subjects.find(sub => sub.props.name === name);

        if(!subject){
            return Result.fail<Subject>("Couldn't find an subject with the given name");
        };

        return Result.ok<Subject>(subject);
    }; 

    async list(): Promise<Result<Subject[]>> {
        return Result.ok<Subject[]>(this.subjects);
    };

};