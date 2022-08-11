import { Subject } from "./Subject";
import { User } from './User';

export interface IRankProps {
    user: User,
    subject: Subject,
    points: number,
};

/**
 * A rank represents the position of an user in the subject rank
 * @param user: User to vinculate to the rank
 * @param subject: Subject to vinculate in the rank
 * @param points: Points that user has in that specific subject 
 */
export class Rank{

    public user : User;
    public subject: Subject;
    public points: number;

    private constructor({ user, subject, points } : IRankProps){
        this.user = user;
        this.subject = subject;
        this.points = points;
    };

    static create({ user, subject, points } : IRankProps){
        return new Rank(
            { user, subject, points }
        );
    };
};