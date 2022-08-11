import { Result } from "../../../core/Result";
import { Rank } from '../../../domain/entities/Rank';
import { IFindUserByIdRepository } from '../../../repositories/User/user-repositories';
import { IFindSubjectByIdRepository } from '../../../repositories/Subject/subject-repositories';
import { IUpdateUserPointsRepository } from '../../../repositories/Rank/rank-repositories';


interface IUpdateUserPointsProps{
    user_id: string,
    subject_id: string,
    points : number
};


export class UpdateUserPointsService {

    constructor(
        private FindUserByIdRepository : IFindUserByIdRepository,
        private FindSubjectByIdRepository : IFindSubjectByIdRepository,
        private UpdateUserPointsRepository : IUpdateUserPointsRepository
    ){};

    async execute({ user_id, subject_id, points } : IUpdateUserPointsProps) : Promise<Result<Rank>> {

        const userOrError = await this.FindUserByIdRepository.execute(user_id);

        if(userOrError.isFailure){
            return Result.fail<Rank>(userOrError.error);
        };

        const subjectOrError = await this.FindSubjectByIdRepository.execute(subject_id);

        if(subjectOrError.isFailure){
            return Result.fail<Rank>(subjectOrError.error);
        };

        const rank = Rank.create({
            user: userOrError.getValue(),
            subject: subjectOrError.getValue(),
            points
        });

        const rankOrError = await this.UpdateUserPointsRepository.execute(rank);

        if(rankOrError.isFailure){
            return Result.fail<Rank>(rankOrError.error);
        };

        return Result.ok<Rank>(rankOrError.getValue());
    };
};