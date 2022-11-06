import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";
import { InMemoryListUsersRepository, inMemoryUsers } from "../../../tests/repositories/User/in-memory-user-repo";
import { ListUsersService } from "./list-users-service";

describe('List users service', () => {
    
    const listUsersRepository = new InMemoryListUsersRepository();
    const service = new ListUsersService(listUsersRepository);

    const user_one = generateRandomUser();
    const user_two = generateRandomUser();

    inMemoryUsers.push(user_one);
    inMemoryUsers.push(user_two);

    it('should return a list of users', async () => {

        const response : Result<User[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toEqual(2);
    });
});