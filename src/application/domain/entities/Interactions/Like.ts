import { Entity } from '../../../core/domain/Entity';
import { User } from '../User';
import { Answer } from './Answer';

export interface ILikeProps {
    author: User,
    answer: Answer,
    created_at?: Date,
};

/**
 * @param author: The user who gaves the like
 * @param answer: The answer which recieved the like
 */
export class Like extends Entity<ILikeProps>{

    private constructor(props : ILikeProps, id?: string){
        super(props, id);
    };

    static create(props, id?: string){
        const like =  new Like(
            {
                ...props,
                created_at: props.created_at ?? new Date()
            },
            id
        );

        return like;
    };
};