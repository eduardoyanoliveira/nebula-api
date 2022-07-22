import { Result } from "../../../../core/Result";
import { Role, User } from "../../../../domain/entities/User";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryUserRepository } from "../../../../tests/repositories/User/in-memory-user-repo";
import { UpdateUserService } from "./update-user-service";


describe('Update user service', () => {

    const repo = new InMemoryUserRepository();
    const service = new UpdateUserService(repo);

    const userThatExists = generateRandomUser();
    repo.users.push(userThatExists);


    afterAll(() => {
        repo.users = [];
    });


    it('should fail with the user does not exist', async () => {

        const reponse : Result<User> = await service.execute({
            id: 'sfasfgaswe-gsg-a-125asfds1f',
            username: 'new_name',
            is_active: true
        });

        expect(reponse.isFailure).toBeTruthy();

    });


    it('should be able to update the user', async () => {

        const reponse : Result<User> = await service.execute({
            id: userThatExists.id,
            username: 'new_name',
            is_active: true
        });

        expect(reponse.isSuccess).toBeTruthy();

        expect(reponse.getValue().props.username).toBe('new_name');

    });

});