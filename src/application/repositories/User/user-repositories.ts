import { Result } from "../../core/Result";
import { User } from "../../domain/entities/User";
export interface ICreateUserRepository {
    execute(user: User) : Promise<Result<User>>,
};

export interface IUpdateUserRepository {
    execute(user: User) : Promise<Result<User>>,
};

export interface IFindUserByIdRepository {
    execute(userId: string) : Promise<Result<User>>,
};

export interface IFindUserByEmailRepository {
    execute(email: string) : Promise<Result<User>>,
};

export interface IListUsersRepository{
    execute(filters?: object): Promise<Result<User[]>>
};