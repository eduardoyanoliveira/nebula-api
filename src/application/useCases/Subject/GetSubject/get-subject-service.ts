import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { IFindSubjectByIdRepository } from "../../../repositories/Subject/subject-repositories";

interface IGetSubjectRequest {
    id: string
};

export class GetSubjectService {
    constructor(
        private FindSubjectByIdRepository : IFindSubjectByIdRepository,
    ){};

    async execute({ id } : IGetSubjectRequest) : Promise<Result<Subject>> {

        const subjectOrError = await this.FindSubjectByIdRepository.execute(id);

        if(subjectOrError.isFailure){
            return Result.fail<Subject>(subjectOrError.error);
        };

        const subject = subjectOrError.getValue();

        return Result.ok<Subject>(subject);

    };
};