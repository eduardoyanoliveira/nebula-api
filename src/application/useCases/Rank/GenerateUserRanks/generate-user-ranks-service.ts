import { GenericResultClass } from "../../../../core/GenericResultClass";
import { Result } from "../../../../core/Result";
import { IRankRepository } from "../../../repositories/Rank/rank-repository";
import { IListSubjectsRepository } from "../../../repositories/Subject/subject-repositories";
import { IFindUserByIdRepository } from "../../../repositories/User/user-repositories";


interface IGenerateUserRanksProps {
    user_id : string
};


export class GenerateUserRanksService {

    constructor(
        private  FindUserByIdRepository : IFindUserByIdRepository,
        private ListSubjectsRepository: IListSubjectsRepository,
        private RankRepository : IRankRepository
    ){};

    async execute({ user_id } : IGenerateUserRanksProps) : Promise<Result<GenericResultClass>>{

        const userOrError = await this.FindUserByIdRepository.execute(user_id);

        if(userOrError.isFailure){
            return Result.fail<GenericResultClass>(userOrError.error);
        };

        const subjectsOrError = await this.ListSubjectsRepository.execute();

        if(subjectsOrError.isFailure){
            return Result.fail<GenericResultClass>(subjectsOrError.error);
        };

        // If there are no subjects on database there is no need to create ranks
        if(subjectsOrError.getValue().length === 0) return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));

        const ranksOrError = await this.RankRepository.generateUserRanks(userOrError.getValue(), subjectsOrError.getValue());

        if(ranksOrError.isFailure){
            return Result.fail<GenericResultClass>(ranksOrError.error);
        };

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };
};