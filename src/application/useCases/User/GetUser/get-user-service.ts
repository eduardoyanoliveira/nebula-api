import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../repositories/User/user-repository";

interface IGetUserRequest{
    user_id: string,
};


export class GetUserService{

    constructor(
        private UserRepository : IUserRepository
    ){};

    async execute({ user_id } : IGetUserRequest) : Promise<Result<User>>{

        const response = await this.UserRepository.findById(user_id);

        if(response.isFailure){
            return Result.fail<User>(response.error);
        };

        const user = response.getValue();

        return Result.ok<User>(user);
    };
};