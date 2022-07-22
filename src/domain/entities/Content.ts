import { Entity } from '../../core/domain/Entity';
import { Subject } from './Subject';

export interface IContentProps {
    description: string,
    url: string,
    subject: Subject,
    created_at?: Date,
    updated_at?: Date
};


/**
 * A Content can be a manual, a video or any source of information about that subject 
 * @method create Static method that creates a new instance of content
 * @param description The content description
 * @param url link to the place where the content is stored
 * @param subject The content subject
 */
export class Content extends Entity<IContentProps>{

    private constructor(props : IContentProps, id?: string){
        super(props, id);
    };

    static create(props, id?: string){
        const content =  new Content(
            {
                ...props,
                created_at: props.created_at ?? new Date(),
                updated_at: props.updated_at ?? new Date()
            },
            id
        );

        return content;
    };
};