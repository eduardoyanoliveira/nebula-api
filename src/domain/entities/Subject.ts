import { Entity } from "../../core/domain/Entity";

export interface ISubjectProps {
    name: string,
    is_active?: boolean,
    created_at?: Date,
    updated_at?: Date
};

/**
 * Like the name subjects says, it is use to gather contents and questions under an unique classification
 * @param name The subjects name
 */
export class Subject extends Entity<ISubjectProps>{

    private constructor(props : ISubjectProps, id?: string){
        super(props, id)
    };

    static create(props, id?: string){
        const subject =  new Subject(
            {
                ...props,
                is_active: props.is_active ?? true,
                created_at: props.created_at ?? new Date(),
                updated_at: props.updated_at ?? new Date()
            },
            id
        );

        return subject;
    };
};