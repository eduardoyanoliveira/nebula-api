import { Entity } from "../../core/domain/Entity";

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
};

export interface IUserProps{
    username: string,
    email: string,
    password: string,
    role: Role,
    is_active?: boolean,
    created_at?: Date,
    updated_at?: Date,
};


export class User extends Entity<IUserProps>{
    private constructor(props: IUserProps, id?: string){
        super(props, id);
    };

    static create(props: IUserProps, id?: string){
        const user = new User(
            {
                ...props,
                is_active: props.is_active ?? true,
                created_at: props.created_at ?? new Date(),
                updated_at: props.updated_at ?? new Date()
            }
            ,
        id);
        return user;
    };
};