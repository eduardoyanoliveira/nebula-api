import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { ISubjectRepository } from "../../../repositories/Subject/subject-repository";

interface IGetSubjectRequest {
    id: string
};

export class GetSubjectService {
    constructor(
        private SubjectRepository : ISubjectRepository,
    ){};

    async execute({ id } : IGetSubjectRequest) : Promise<Result<Subject>> {

        const subjectOrError = await this.SubjectRepository.findById(id);

        if(subjectOrError.isFailure){
            return Result.fail<Subject>(subjectOrError.error);
        };

        const subject = subjectOrError.getValue();

        return Result.ok<Subject>(subject);

    };
};