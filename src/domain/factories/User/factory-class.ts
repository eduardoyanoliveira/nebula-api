import { User } from "../../entities/User";
import { AdminUser, BaseUser } from "./concrete-classes";

export interface IUserFactory {
    create(role: string, username: string, email: string, password: string): User,
}

export const userConcretClasses = {
    'USER': BaseUser,
    'ADMIN': AdminUser
};

export class UserFactory implements IUserFactory {
    
    create(role: string, username: string, email: string, password: string) : User {
        return userConcretClasses[role].create(username, email, password);
    };
};