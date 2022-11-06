import { RemoveLikeService } from "./remove-like-service";
import { InMemoryFindLikeByAuthorAndAnswerRepository, inMemoryLikes, InMemoryRemoveLikeRepository } from '../../../tests/repositories/Like/in-memory-like-repository';
import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../tests/repositories/User/in-memory-user-repo';
import { inMemoryAnswers, InMemoryFindAnswerByIdRepository } from '../../../tests/repositories/Answer/in-memory-answer-repository';
import { generateRandomAnswer } from "../../../tests/generators/generate-random-answer";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";
import { generateRandomQuestion } from "../../../tests/generators/generate-random-question";
import { generateRandomSubject } from "../../../tests/generators/generate-random-subject";
import { generateRandomLike } from "../../../tests/generators/generate-random-like";


describe('Remove Like Service tests', () => {

    const findLikeByAuthorAndAnswerRepository = new InMemoryFindLikeByAuthorAndAnswerRepository();
    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const findAnswerByIdRepository = new InMemoryFindAnswerByIdRepository();

    const removeLikeRepository = new InMemoryRemoveLikeRepository();

    const service = new RemoveLikeService(
        findUserByIdRepository,
        findAnswerByIdRepository,
        findLikeByAuthorAndAnswerRepository,
        removeLikeRepository
    );

    const questionUser = generateRandomUser();
    const questionSubject = generateRandomSubject();
    const randomQuestion = generateRandomQuestion(questionUser, questionSubject);

    const answerUser = generateRandomUser();
    const likedAnswer = generateRandomAnswer(answerUser, randomQuestion);

    inMemoryAnswers.push(likedAnswer);

    const likeAuthor = generateRandomUser();

    inMemoryUsers.push(likeAuthor);

    const randomLike = generateRandomLike({ likeAuthor, likedAnswer });

    inMemoryLikes.push(randomLike);

    it('should fail if the user does not exist', async () => {

        const response = await service.execute({
            userId: 'fake-radom-id',
            answerId: likedAnswer.id
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe("Couldn't find an user with the given id");
    });

    
    it('should fail if the answer does not exist', async () => {

        const response = await service.execute({
            userId: likeAuthor.id,
            answerId: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('Could not find the answer by the given id');
    });


    it('should be able to remove a like from the database', async () => {

        const response = await service.execute({
            userId: likeAuthor.id,
            answerId: likedAnswer.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBe('Like successfuly remove from database');
        expect(inMemoryLikes.length).toBe(0);
    });
});