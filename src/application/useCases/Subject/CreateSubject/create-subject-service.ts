import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { ISubjectRepository } from "../../../repositories/Subject/subject-repository";

interface ICreateSubjectRequest {
    name: string
};

export class CreateSubjectService {
    constructor(
        private SubjectRepository : ISubjectRepository
    ){};

    async execute({ name } : ICreateSubjectRequest) : Promise<Result<Subject>>{

        const alreadyExists = await this.SubjectRepository.findByName(name);

        if(alreadyExists.isSuccess){
            return Result<Subject>.fail('Name is already taken');
        };

        const subject = Subject.create({name});

        // Persist on database
        const databaseResponse = await this.SubjectRepository.create(subject);

        if(databaseResponse.isFailure){
            return Result.fail<Subject>(databaseResponse.error);
        };

        return Result<Subject>.ok(subject);
    };
};