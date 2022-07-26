import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { IUserFactory } from "../../../domain/factories/User/factory-class";
import { IEmailValidator } from "../../../domain/interfaces/email-interfaces";
import { IPasswordCryptographer, IPasswordValidator } from "../../../domain/interfaces/password-interfaces";
import { ICreateUserRepository, IFindUserByEmailRepository } from "../../../repositories/User/user-repositories";


interface ICreateUserRequest{
    role: string,
    username: string,
    email: string,
    password: string,
    photo?: string,
};


export class CreateUserService{

    constructor(

        private FindUserByEmailRepository : IFindUserByEmailRepository,
        private CreateUserRepository : ICreateUserRepository ,
        private PasswordValidator: IPasswordValidator,
        private EmailValidator: IEmailValidator,
        private PasswordCryptographer: IPasswordCryptographer,
        private UserFactory: IUserFactory
    )
    {};

    async execute({ role, username, email, password, photo } : ICreateUserRequest) : Promise<Result<User>>{

        const alreadyExists : Result<User> = await this.FindUserByEmailRepository.execute(email);

        if(alreadyExists.isSuccess){
            return Result.fail<User>('This email is already registered on database');
        };

        const isValidEmail = await this.EmailValidator.validate(email);

        if(!isValidEmail){
            return Result.fail<User>('Email is invalid');
        };

        const isValidPassword = await this.PasswordValidator.validate(password);

        if(!isValidPassword){
            return Result.fail<User>(this.PasswordValidator.pattern);
        };

        const cryptoPassword = await this.PasswordCryptographer.crypt(password);
  
        const user = this.UserFactory.create(role, username, email, cryptoPassword, photo);

        // Persist on database

        await this.CreateUserRepository.execute(user);

        return Result.ok<User>(user);

    };
};