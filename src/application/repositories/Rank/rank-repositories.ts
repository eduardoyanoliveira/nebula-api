import { GenericResultClass } from "../../core/GenericResultClass";
import { Result } from "../../core/Result";
import { Rank } from "../../domain/entities/Rank";
import { Subject } from "../../domain/entities/Subject";
import { User } from "../../domain/entities/User";


export interface IGenerateUserRanksRepository {
    execute(user: User, subjects: Subject[]): Promise<Result<GenericResultClass>>,
};

export interface IGenerateSubjectRanksRepository{
    execute(subject: Subject, users: User[]): Promise<Result<GenericResultClass>>,
};

export interface IListRanksBySubjectRepository {
    execute(subject_id : string): Promise<Result<Rank[]>>,
};

export interface IUpdateUserPointsRepository{
    execute(rank: Rank): Promise<Result<Rank>>,
};