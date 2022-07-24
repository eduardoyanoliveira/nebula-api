import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { UserFactory } from "../../../../domain/factories/User/factory-class";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryCreateUserRepository, InMemoryFindUserByEmailRepository } from "../../../../tests/repositories/User/in-memory-user-repo";
import { EmailValidator } from "../../../../utils/email/email-validator";
import { PasswordValidator } from "../../../../utils/password/password-validator";
import { PasswordCryptographer } from "../../../services/Cryptography/password-cryptography";
import { CreateUserService } from "./create-user-service";


describe('Create user service', () => {

    const findUserByEmailRepository = new InMemoryFindUserByEmailRepository();
    const createUserRepository = new InMemoryCreateUserRepository();
    const validatePassword = new PasswordValidator();
    const emailValidator = new EmailValidator();
    const passwordCryptographer = new PasswordCryptographer();
    const userFactory = new UserFactory();

    const service = new CreateUserService(
        findUserByEmailRepository,
        createUserRepository,
        validatePassword, 
        emailValidator, 
        passwordCryptographer,
        userFactory 
    );

    // Genereate a random user and add to database
    const userThatAlreadyExists = generateRandomUser();
    createUserRepository.execute(userThatAlreadyExists);
       
    it('should fail if the user already exists', async () => {

        const userOrError : Result<User> = await service.execute({
            role: 'ADMIN',
            username: 'user_one',
            email: userThatAlreadyExists.props.email,
            password: 'E@psa3',
        });

        expect(userOrError.isFailure).toBeTruthy();
        expect(userOrError.error).toBe('This email is already registered on database');
    });


    it('should fail if the email is invalid', async () => {

        const userOrError : Result<User> = await service.execute({
            role: 'ADMIN',
            username: 'test_user',
            email: 'test@failemail',
            password: 'E@psa3',
        });
   
        expect(userOrError.isFailure).toBeTruthy();

    });

    

    it('should fail if the password is invalid', async () => {

        const userOrError : Result<User> = await service.execute({
            role: 'ADMIN',
            username: 'test_user',
            email: 'test@failpassword.com',
            password: 'Epsa3',
        });
   
        expect(userOrError.isFailure).toBeTruthy();

    });


    it('should be able to create a new user', async () => {
 
        const userOrError : Result<User> = await service.execute({
            role: 'ADMIN',
            username: 'test_user',
            email: 'test@test.com',
            password: 'E@psa3',
        });

        expect(userOrError.isSuccess).toBeTruthy();

    });
});