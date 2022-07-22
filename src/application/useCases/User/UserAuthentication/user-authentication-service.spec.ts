import { Result } from "../../../../core/Result";
import { User } from "../../../../domain/entities/User";
import { UserCredentials } from "../../../../domain/entities/UserCredentials";
import { IAuthenticationService, IValidateResult } from "../../../../interfaces/authentication-interfaces";
import { IPasswordCryptographer } from "../../../../interfaces/password-interfaces";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryUserRepository } from "../../../../tests/repositories/User/in-memory-user-repo";
import { UserAuthenticationService } from "./user-authentication-service";


class MockAuthenticationService implements IAuthenticationService{
    generate(user: User): string {
        return 'fake-token';
    };

    validate(token: string): IValidateResult {
        return { isValid: token === 'fake-token', user_id: 'fake-id'};
    };
    
};

class MockPasswordCryptographer implements IPasswordCryptographer{

    private pwd : string;

    async crypt(password: string): Promise<string> {
        this.pwd = password;
        return password
    };
    
    async compare(password: string, cryptographedPassword: string): Promise<boolean> {
        return password === this.pwd; 
    };
};


describe('User authenticate', () => {

    const authenticationService = new MockAuthenticationService();
    const repo = new InMemoryUserRepository();
    const passwordCryptographer = new MockPasswordCryptographer();
    const service = new UserAuthenticationService(repo, passwordCryptographer, authenticationService);

    const userThatExists = generateRandomUser();

    beforeAll( async () => {

        userThatExists.props.password = await passwordCryptographer.crypt(userThatExists.props.password);
        repo.users.push(userThatExists);
    });
      

    afterAll(() => {
        repo.users = [];
    });
      

    it('should fail with the user does not exist', async () => {

        const response : Result<UserCredentials> = await service.execute({
            email: 'test@server.com',
            password: '123456789'
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should fail with the password does not match with the database cryptographed password bound with the use', async () => {

        const response : Result<UserCredentials> = await service.execute({
            email: userThatExists.props.email,
            password: '123456'
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('No such an user with these credentials');
    });


    it('should return a token', async () =>{

        const response : Result<UserCredentials> = await service.execute({
            email: userThatExists.props.email,
            password: userThatExists.props.password
        });

        expect(response.getValue().token).toBeTruthy();

    });
});