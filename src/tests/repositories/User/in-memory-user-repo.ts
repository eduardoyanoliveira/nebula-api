import { ICreateUserRepository, IFindUserByEmailRepository, IFindUserByIdRepository, IListUsersRepository, IUpdateUserRepository } from "../../../application/repositories/User/user-repository";
import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";

export const inMemoryUsers: User[] = [];
export class InMemoryCreateUserRepository implements ICreateUserRepository{

    async execute(user: User): Promise<Result<User>> {
        inMemoryUsers.push(user);

        return Result.ok<User>(user);
    };
};

export class InMemoryUpdateUserRepository implements IUpdateUserRepository{
    async execute(user: User): Promise<Result<User>> {

        const index = inMemoryUsers.findIndex(item => item.id === user.id);

        inMemoryUsers[index] = user;

        return Result.ok<User>(user);
    };
};

export class InMemoryFindUserByIdRepository implements IFindUserByIdRepository{
    async execute(id: string): Promise<Result<User>> {
        
        const user = inMemoryUsers.find(user => user.id === id);

        if(!user){
            return Result.fail<User>("Couldn't find an user with the given id");
        };

        return Result.ok<User>(user);
    };
};

export class InMemoryFindUserByEmailRepository implements IFindUserByEmailRepository{
    async execute(email: string): Promise<Result<User>> {
        
        const user = inMemoryUsers.find(user => user.props.email === email);

        if(!user){
            return Result.fail<User>("Couldn't find an user with the given email");
        };

        return Result.ok<User>(user);
    }; 
};

export class InMemoryListUsersRepository implements IListUsersRepository{
    async execute(): Promise<Result<User[]>> {
        return Result.ok<User[]>(inMemoryUsers);
    };
};
