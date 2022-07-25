import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { IListUsersRepository } from "../../../repositories/User/user-repositories";

interface IListUserRequest {
    filters?: object
};

export class ListUsersService{
    constructor(
        private ListUsersRepository: IListUsersRepository,
    ){};

    async execute({ filters }: IListUserRequest) : Promise<Result<User[]>>{
        return await this.ListUsersRepository.execute(filters);
    };
};