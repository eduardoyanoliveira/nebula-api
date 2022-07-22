import { GenericResultClass } from "../../../core/GenericResultClass";
import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { Subject } from "../../../domain/entities/Subject";
import { User } from "../../../domain/entities/User";

export interface IRankRepository {

    generateUserRanks(user: User, subjects: Subject[]): Promise<Result<GenericResultClass>>,
    generateSubjectRanks(subject: Subject, users: User[]): Promise<Result<GenericResultClass>>,
    listRanksBySubject(subject_id : string): Promise<Result<Rank[]>>,
    updateUserPoints(rank: Rank): Promise<Result<Rank>>,
};