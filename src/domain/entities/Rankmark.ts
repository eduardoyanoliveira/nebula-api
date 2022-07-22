import { Entity } from "../../core/domain/Entity";

export interface IRankmarkProps {
    name: string,
    points: number,
    color: string,
    is_active?: boolean,
    created_at?: Date,
    updated_at?: Date
}


/**
 * Use for classify users by their points on each subject rank. eg ( Begginer, Intermediate, Mester )
 * @method create Static method that creates a new instance of rankmark
 * @param color Use to difference rankmarks on frontend
 * @param points How many points an user need to have to achieve that rankmark
 */
export class Rankmark extends Entity<IRankmarkProps>{

    private constructor(props : IRankmarkProps, id?: string){
        super(props, id)
    };

    static create(props, id?: string){
        const rankmark =  new Rankmark(
            {
                ...props,
                is_active: props.is_active ?? true,
                created_at: props.created_at ?? new Date(),
                updated_at: props.updated_at ?? new Date()
            },
            id
        );

        return rankmark;
    };
};