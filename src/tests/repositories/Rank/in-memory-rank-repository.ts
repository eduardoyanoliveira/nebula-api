import { IRankRepository } from "../../../application/repositories/Rank/rank-repository";
import { GenericResultClass } from "../../../core/GenericResultClass";
import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { Subject } from "../../../domain/entities/Subject";
import { User } from "../../../domain/entities/User";

export class InMemoryRankRepository implements IRankRepository{

    public ranks : Rank[] = [];

    async generateUserRanks(user: User, subjects: Subject[]): Promise<Result<GenericResultClass>> {

        subjects.forEach((subject) => {

            const rank = Rank.create({
                user: user,
                subject: subject,
                points: 0
            });

            this.ranks.push(rank);
        });

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };

    async generateSubjectRanks(subject: Subject, users: User[]): Promise<Result<GenericResultClass>> {
        
        users.forEach((user) => {

            const rank = Rank.create({
                user: user,
                subject: subject,
                points: 0
            });

            this.ranks.push(rank);
        });

        return Result.ok<GenericResultClass>(GenericResultClass.create('ok'));
    };

    async listRanksBySubject(subject_id: string): Promise<Result<Rank[]>> {
        const ranks = this.ranks.filter(rank => rank.subject.id === subject_id);
        
        return Result.ok<Rank[]>(ranks);
    };

    async updateUserPoints(rank: Rank): Promise<Result<Rank>> {

        const updatedRank = this.ranks.find(item => (item.user.id === rank.user.id && item.subject.id === rank.subject.id));

        if(!updatedRank){
            return Result.fail<Rank>("Couldn't find the rank");
        };

        updatedRank.points = rank.points;

        return Result.ok<Rank>(rank);
    };
  
};