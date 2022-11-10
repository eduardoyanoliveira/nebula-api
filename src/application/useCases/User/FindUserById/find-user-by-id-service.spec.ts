import { Result } from "../../../core/Result";
import { User } from "../../../domain/entities/User";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";
import { InMemoryFindUserByIdRepository, inMemoryUsers } from "../../../tests/repositories/User/in-memory-user-repo";
import { FindUserByIdService } from "./find-user-by-id-service";

describe('Get user service', () => {

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const service = new FindUserByIdService(findUserByIdRepository);

    // Generates a random user to be retrieved from database
    const userThatExists = generateRandomUser();
    inMemoryUsers.push(userThatExists);

    it('should fail with the user does not exists', async () => {
        const response : Result<User> = await service.execute({ userId: 'fake-id' });

        expect(response.isFailure).toBeTruthy();
    });

    it('should return the user', async () => {
        const response : Result<User> = await service.execute({ userId: userThatExists.id });

        expect(response.isSuccess).toBeTruthy();
    });

});