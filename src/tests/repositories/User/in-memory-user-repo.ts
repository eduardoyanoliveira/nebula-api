import { IUserRepository } from "../../../application/repositories/User/user-repository";
import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";

export class InMemoryUserRepository implements IUserRepository{

    public users: User[] = [];

    async create(user: User): Promise<Result<User>> {
        this.users.push(user);

        return Result.ok<User>(user);
    };

    
    async update(user: User): Promise<Result<User>> {

        const index = this.users.findIndex(item => item.id === user.id);

        this.users[index] = user;

        return Result.ok<User>(user);
    };

    async findById(id: string): Promise<Result<User>> {
        
        const user = this.users.find(user => user.id === id);

        if(!user){
            return Result.fail<User>("Couldn't find an user with the given id");
        };

        return Result.ok<User>(user);
    };
    
    async findByEmail(email: string): Promise<Result<User>> {
        
        const user = this.users.find(user => user.props.email === email);

        if(!user){
            return Result.fail<User>("Couldn't find an user with the given email");
        };

        return Result.ok<User>(user);
    };

    async list(): Promise<Result<User[]>> {
        return Result.ok<User[]>(this.users);
    };

};