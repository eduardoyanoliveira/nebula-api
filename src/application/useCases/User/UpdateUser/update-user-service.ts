import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../repositories/User/user-repository";

interface IUpdateUserRequest {
    id: string,
    username?: string,
    is_active?: boolean,
};


export class UpdateUserService {

    constructor(
        private UserRepository : IUserRepository,
    ){};

    async execute({ id, username, is_active} : IUpdateUserRequest) : Promise<Result<User>>{

        const response = await this.UserRepository.findById(id);

        if(response.isFailure){
            return Result.fail<User>(response.error);
        };

        const user = response.getValue();

        user.props.username = username ?? user.props.username;
        user.props.is_active = is_active ?? user.props.is_active;
        user.props.updated_at = new Date();

        // Persist on database

        await this.UserRepository.update(user);

        return Result.ok<User>(user);
    };

};