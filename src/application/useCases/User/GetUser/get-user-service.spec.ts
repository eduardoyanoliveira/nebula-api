import { Result } from "../../../../core/Result";
import { Role, User } from "../../../../domain/entities/User";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryUserRepository } from "../../../../tests/repositories/User/in-memory-user-repo";
import { GetUserService } from "./get-user-service";

describe('Get user service', () => {
    const repo = new InMemoryUserRepository();
    const service = new GetUserService(repo);

    // Generates a random user to be retrieved from database
    const userThatExists = generateRandomUser();
    repo.users.push(userThatExists);


    afterAll(() => {
        repo.users = [];
    });

      
    it('should fail with the user does not exists', async () => {
        const response : Result<User> = await service.execute({ user_id: 'fake-id' });

        expect(response.isFailure).toBeTruthy();
    });

    it('should return the user', async () => {
        const response : Result<User> = await service.execute({ user_id: userThatExists.id });

        expect(response.isSuccess).toBeTruthy();
    });

});