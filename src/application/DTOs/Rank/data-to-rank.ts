import { Rank } from "../../../domain/entities/Rank";
import { Subject } from "../../../domain/entities/Subject";
import { Role, User } from "../../../domain/entities/User";
import { IRankDataProps } from "./interfaces";


export interface IDataToRank {
    dataToRank(rankData: IRankDataProps): Rank
};

export class DataToRank implements IDataToRank{

    dataToRank(rankData: IRankDataProps): Rank {
        const { user_id, user, subject_id, subject, ...props } = rankData;

        const { id: userId, ...userRest } = user;

        const userProps = {
            ...userRest,
            role: Role[userRest.role]
        };

        const { id: subjectId, ...subjectProps } = subject;

        const newUser = User.create(userProps, userId);

        const newSubject = Subject.create(subjectProps, subjectId);

        const rank = Rank.create({ user: newUser, subject: newSubject, points:props.points });

        return rank;
    };
    
};