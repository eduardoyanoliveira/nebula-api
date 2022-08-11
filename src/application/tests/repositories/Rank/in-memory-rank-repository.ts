import { IGenerateSubjectRanksRepository, IGenerateUserRanksRepository, IListRanksBySubjectRepository, IUpdateUserPointsRepository } from "../../../repositories/Rank/rank-repositories";
import { GenericResultClass } from "../../../core/GenericResultClass";
import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { Subject } from "../../../domain/entities/Subject";
import { User } from "../../../domain/entities/User";

export const inMemoryRanks : Rank[] = [];

export class InMemoryGenerateUserRanksRepository implements IGenerateUserRanksRepository{

    async execute(user: User, subjects: Subject[]): Promise<Result<GenericResultClass>> {

        subjects.forEach((subject) => {

            const rank = Rank.create({
                user: user,
                subject: subject,
                points: 0
            });

            inMemoryRanks.push(rank);
        });

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };
};

export class InMemoryGenerateSubjectRanksRepository implements IGenerateSubjectRanksRepository{

    async execute(subject: Subject, users: User[]): Promise<Result<GenericResultClass>> {
        
        users.forEach((user) => {

            const rank = Rank.create({
                user: user,
                subject: subject,
                points: 0
            });

            inMemoryRanks.push(rank);
        });

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };
};

export class InMemoryListRanksBySubjectRepository implements IListRanksBySubjectRepository{
   
    async execute(subject_id: string): Promise<Result<Rank[]>> {
        const ranks = inMemoryRanks.filter(rank => rank.subject.id === subject_id);
        
        return Result.ok<Rank[]>(ranks);
    }; 
};

export class InMemoryUpdateUserPointsRepository implements IUpdateUserPointsRepository{
    async execute(rank: Rank): Promise<Result<Rank>> {

        const updatedRank = inMemoryRanks.find(item => (item.user.id === rank.user.id && item.subject.id === rank.subject.id));

        if(!updatedRank){
            return Result.fail<Rank>("Couldn't find the rank");
        };

        updatedRank.points = rank.points;

        return Result.ok<Rank>(rank);
    }; 
};
