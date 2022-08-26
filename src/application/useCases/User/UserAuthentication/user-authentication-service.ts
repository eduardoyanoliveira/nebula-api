import { Result } from "../../../core/Result";
import { UserCredentials } from "../../../domain/entities/UserCredentials";
import { IAuthenticationService } from "../../../domain/interfaces/authentication-interfaces";
import { IPasswordCryptographer } from "../../../domain/interfaces/password-interfaces";
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
            id: user.id,
            username: user.props.username,
            email: email,
            role: user.props.role,
            photo: user.props.photo,
            token: token
        });

        return Result.ok<UserCredentials>(userCredentials);

    };
};