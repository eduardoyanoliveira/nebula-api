import { Result } from "../../../../core/Result";
import { UserCredentials } from "../../../../domain/entities/UserCredentials";
import { IAuthenticationService } from "../../../../interfaces/authentication-interfaces";
import { IPasswordCryptographer } from "../../../../interfaces/password-interfaces";
import { IFindUserByEmailRepository } from "../../../repositories/User/user-repositories";

interface IUserAuthRequest {
    email: string,
    password: string
};

export class UserAuthenticationService{
    constructor(
        private FindUserByEmailRepository : IFindUserByEmailRepository,
        private PasswordCryptographer: IPasswordCryptographer,
        private AuthenticationService: IAuthenticationService
    ){};

    async execute({ email, password } : IUserAuthRequest) : Promise<Result<UserCredentials>> {

        const response = await this.FindUserByEmailRepository.execute(email); 

        if(response.isFailure){
            return Result.fail<UserCredentials>(response.error)
        };

        const user = response.getValue();

        const comparedPassword = await this.PasswordCryptographer.compare(password, user.props.password);

        if(!comparedPassword){
            return Result.fail<UserCredentials>('No such an user with these credentials');
        };

        const token = this.AuthenticationService.generate(user);

        const userCredentials = UserCredentials.create({
            user_id: user.id,
            username: user.props.username,
            email: email,
            token: token
        });

        return Result.ok<UserCredentials>(userCredentials);

    };
};