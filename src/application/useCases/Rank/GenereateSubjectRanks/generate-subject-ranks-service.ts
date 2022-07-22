import { GenericResultClass } from "../../../../core/GenericResultClass";
import { Result } from "../../../../core/Result";
import { IRankRepository } from "../../../repositories/Rank/rank-repository";
import { ISubjectRepository } from "../../../repositories/Subject/subject-repository";
import { IUserRepository } from "../../../repositories/User/user-repository";


interface IGenerateSubjectRanksProps {
    subject_id: string
};


export class GenerateSubjectRanksService {

    constructor(
        private SubjectRepository: ISubjectRepository,
        private  UserRepository : IUserRepository,
        private RankRepository : IRankRepository
    ){};

    async execute({ subject_id } : IGenerateSubjectRanksProps) : Promise<Result<GenericResultClass>>{

        const subjectOrError = await this.SubjectRepository.findById(subject_id);

        if(subjectOrError.isFailure){
            return Result.fail<GenericResultClass>(subjectOrError.error);
        };

        const usersOrError = await this.UserRepository.list();

        if(usersOrError.isFailure){
            return Result.fail<GenericResultClass>(usersOrError.error);
        };

        const ranksOrError = await this.RankRepository.generateSubjectRanks(subjectOrError.getValue(), usersOrError.getValue());

        if(ranksOrError.isFailure){
            return Result.fail<GenericResultClass>(ranksOrError.error);
        };

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };
};