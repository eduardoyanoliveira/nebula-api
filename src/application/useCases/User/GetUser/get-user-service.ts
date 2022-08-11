import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { IFindUserByIdRepository } from "../../../repositories/User/user-repositories";

interface IGetUserRequest{
    user_id: string,
};


export class GetUserService{

    constructor(
        private FindUserByIdRepository : IFindUserByIdRepository
    ){};

    async execute({ user_id } : IGetUserRequest) : Promise<Result<User>>{

        const response = await this.FindUserByIdRepository.execute(user_id);

        if(response.isFailure){
            return Result.fail<User>(response.error);
        };

        const user = response.getValue();

        return Result.ok<User>(user);
    };
};