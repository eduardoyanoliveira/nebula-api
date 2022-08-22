import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { IFindUserByIdRepository, IUpdateUserRepository } from "../../../repositories/User/user-repositories";

interface IUpdateUserRequest {
    id: string,
    username?: string,
    photo?: string,
    is_active?: boolean,
};


export class UpdateUserService {

    constructor(
        private FindUserByIdRepository: IFindUserByIdRepository,
        private UpdateUserRepository : IUpdateUserRepository,
    ){};

    async execute({ id, username, photo, is_active} : IUpdateUserRequest) : Promise<Result<User>>{

        const response = await this.FindUserByIdRepository.execute(id);

        if(response.isFailure){
            return Result.fail<User>(response.error);
        };

        const user = response.getValue();

        user.props.username = username ?? user.props.username;
        user.props.is_active = is_active ?? user.props.is_active;
        user.props.photo = photo ?? user.props.photo;
        user.props.updated_at = new Date();

        // Persist on database

        await this.UpdateUserRepository.execute(user);

        return Result.ok<User>(user);
    };

};