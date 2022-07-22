import { Result } from "../../../../core/Result";
import { Role, User } from "../../../../domain/entities/User";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryUserRepository } from "../../../../tests/repositories/User/in-memory-user-repo";
import { ListUsersService } from "./list-users-service";

describe('List users service', () => {
    
    const repo = new InMemoryUserRepository();
    const service = new ListUsersService(repo);

    const user_one = generateRandomUser();
    const user_two = generateRandomUser();

    repo.users.push(user_one);
    repo.users.push(user_two);
      
    afterAll(() => {
        repo.users = [];
    });
      

    it('should return a list of users', async () => {

        const response : Result<User[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toEqual(2);
    });
});