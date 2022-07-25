import { GenericResultClass } from "../../../../core/GenericResultClass";
import { Result } from "../../../../core/Result";
import { IGenerateSubjectRanksRepository } from "../../../repositories/Rank/rank-repositories";
import { IFindSubjectByIdRepository } from "../../../repositories/Subject/subject-repositories";
import { IListUsersRepository } from "../../../repositories/User/user-repositories";


interface IGenerateSubjectRanksProps {
    subject_id: string
};


export class GenerateSubjectRanksService {

    constructor(
        private FindSubjectByIdRepository: IFindSubjectByIdRepository,
        private ListUsersRepository : IListUsersRepository,
        private GenerateSubjectRanksRepository : IGenerateSubjectRanksRepository
    ){};

    async execute({ subject_id } : IGenerateSubjectRanksProps) : Promise<Result<GenericResultClass>>{

        const subjectOrError = await this.FindSubjectByIdRepository.execute(subject_id);

        if(subjectOrError.isFailure){
            return Result.fail<GenericResultClass>(subjectOrError.error);
        };

        const usersOrError = await this.ListUsersRepository.execute();

        if(usersOrError.isFailure){
            return Result.fail<GenericResultClass>(usersOrError.error);
        };

        const ranksOrError = await this.GenerateSubjectRanksRepository.execute(subjectOrError.getValue(), usersOrError.getValue());

        if(ranksOrError.isFailure){
            return Result.fail<GenericResultClass>(ranksOrError.error);
        };

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };
};