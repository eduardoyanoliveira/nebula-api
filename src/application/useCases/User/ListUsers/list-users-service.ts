import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../repositories/User/user-repository";

interface IListUserRequest {
    filters?: object
};

export class ListUsersService{
    constructor(
        private UserRepository: IUserRepository,
    ){};

    async execute({ filters }: IListUserRequest) : Promise<Result<User[]>>{
        return await this.UserRepository.list(filters);
    };
};