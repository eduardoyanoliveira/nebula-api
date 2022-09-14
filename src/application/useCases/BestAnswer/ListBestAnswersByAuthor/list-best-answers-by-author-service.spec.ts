import { generateRandomBestAnswer } from "../../../tests/generate-random-best-answers";
import { generateRandomUser } from "../../../tests/generate-random-user";
import { inMemoryBestAnswers, InMemoryListBestAnswerByAuthorRepository } from "../../../tests/repositories/BestAnswer/in-memory-best-answer-repository";
import { InMemoryFindUserByIdRepository, inMemoryUsers } from "../../../tests/repositories/User/in-memory-user-repo";
import { ListBestAnswersByAuthorService } from "./list-best-answers-by-author-service";

describe('List BestAnswers by author tests', () => { 
    
    const inMemoryFindUserById = new InMemoryFindUserByIdRepository();
    const inMemoryListBestAnswersByAuthor = new InMemoryListBestAnswerByAuthorRepository();

    const service = new ListBestAnswersByAuthorService(inMemoryFindUserById, inMemoryListBestAnswersByAuthor);

    const userA = generateRandomUser();
    const userB = generateRandomUser();
 
    inMemoryUsers.push(userA);
    inMemoryUsers.push(userB);

    const bestQuestionA = generateRandomBestAnswer(userA);
    const bestQuestionB = generateRandomBestAnswer(userA);


    inMemoryBestAnswers.push(bestQuestionA);
    inMemoryBestAnswers.push(bestQuestionB);


    it('should fail if the author does not exists', async () => {
        const response = await service.execute({
            author_id: 'test-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should return a list of the only two best answers linked to this author', async () => {

        const response = await service.execute({
            author_id: userA.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
    });

    it('should return an empty list', async () => {
        const response = await service.execute({
            author_id: userB.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(0);
    });
    
});