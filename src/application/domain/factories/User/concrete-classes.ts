import { IUserProps, Role, User } from "../../entities/User";

export class BaseUser implements IUserProps {

    username: string;
    email: string;
    password: string;
    role: Role;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;

    private constructor(username: string, email: string, password: string){
        this.username = username;
        this.email = email;
        this.password = password;

        this.role = Role.USER;
        this.is_active = true;
        this.created_at = new Date();
        this.updated_at = new Date()
    };

    static create(username: string, email: string, password: string){
        const baseUser = new BaseUser(username, email, password);
        return User.create(baseUser);
    };
};


export class AdminUser implements IUserProps {

    username: string;
    email: string;
    password: string;
    role: Role;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;

    private constructor(username: string, email: string, password: string){
        this.username = username;
        this.email = email;
        this.password = password;

        this.role = Role.ADMIN;
        this.is_active = true;
        this.created_at = new Date();
        this.updated_at = new Date()
    };

    static create(username: string, email: string, password: string){
        const baseUser = new AdminUser(username, email, password);
        return User.create(baseUser);
    };
};


