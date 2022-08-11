import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { ICreateSubjectRepository, IFindSubjectByNameRepository } from "../../../repositories/Subject/subject-repositories";

interface ICreateSubjectRequest {
    name: string
};

export class CreateSubjectService {
    constructor(
        private FindSubjectByNameRepository : IFindSubjectByNameRepository,
        private CreateSubjectRepository: ICreateSubjectRepository
    ){};

    async execute({ name } : ICreateSubjectRequest) : Promise<Result<Subject>>{

        const alreadyExists = await this.FindSubjectByNameRepository.execute(name);

        if(alreadyExists.isSuccess){
            return Result<Subject>.fail('Name is already taken');
        };

        const subject = Subject.create({name});

        // Persist on database
        const databaseResponse = await this.CreateSubjectRepository.execute(subject);

        if(databaseResponse.isFailure){
            return Result.fail<Subject>(databaseResponse.error);
        };

        return Result<Subject>.ok(subject);
    };
};