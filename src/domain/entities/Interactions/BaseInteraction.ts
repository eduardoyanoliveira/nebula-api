import { User } from '../User';
import { Entity } from '../../../core/domain/Entity';

export interface IInteractionProps {
    
    text: string,
    author: User,
    created_at?: Date,
    updated_at?: Date
};


export abstract class BaseInteraction<T> extends Entity<T>{

    constructor(props : T, id?: string){
        super({
            ...props,
        }, id)
    };
};