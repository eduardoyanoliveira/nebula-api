import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { IFindUserByIdRepository } from "../../../repositories/User/user-repositories";

interface IFindUserByIdRequest{
    userId: string,
};


export class FindUserByIdService{

    constructor(
        private FindUserByIdRepository : IFindUserByIdRepository
    ){};

    async execute({ userId } : IFindUserByIdRequest) : Promise<Result<User>>{

        const response = await this.FindUserByIdRepository.execute(userId);

        if(response.isFailure){
            return Result.fail<User>(response.error);
        };

        const user = response.getValue();

        return Result.ok<User>(user);
    };
};