import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";

export interface IUserRepository {
    create(user: User) : Promise<Result<User>>,
    update(user: User) : Promise<Result<User>>,
    findById(user_id: string) : Promise<Result<User>>,
    findByEmail(email: string) : Promise<Result<User>>,
    list(filters?: object): Promise<Result<User[]>>
};