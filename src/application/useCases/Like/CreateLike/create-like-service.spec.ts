import { CreateLikeService } from "./create-like-service";
import { InMemoryFindLikeByAuthorAndAnswerRepository, inMemoryLikes } from '../../../tests/repositories/Like/in-memory-like-repository';
import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../tests/repositories/User/in-memory-user-repo';
import { inMemoryAnswers, InMemoryFindAnswerByIdRepository } from '../../../tests/repositories/Answer/in-memory-answer-repository';
import { InMemoryCreateLikeRepository } from '../../../tests/repositories/Like/in-memory-like-repository';
import { generateRandomAnswer } from "../../../tests/generate-random-answer";
import { generateRandomUser } from "../../../tests/generate-random-user";
import { generateRandomQuestion } from "../../../tests/generate-random-question";
import { generateRandomSubject } from "../../../tests/generate-random-subject";
import { generateRandomLike } from "../../../tests/generate-random-like";
import { Like } from "../../../domain/entities/Interactions/Like";


describe('CreateLikeService tests', () => {

    const findLikeByAuthorAndAnswerRepository = new InMemoryFindLikeByAuthorAndAnswerRepository();
    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const findAnswerByIdRepository = new InMemoryFindAnswerByIdRepository();

    const createLikeRepository = new InMemoryCreateLikeRepository();

    const service = new CreateLikeService(
        findUserByIdRepository,
        findAnswerByIdRepository,
        findLikeByAuthorAndAnswerRepository,
        createLikeRepository
    );

    const questionUser = generateRandomUser();
    const questionSubject = generateRandomSubject();
    const randomQuestion = generateRandomQuestion(questionUser, questionSubject);

    const answerUser = generateRandomUser();
    const likedAnswer = generateRandomAnswer(answerUser, randomQuestion);

    inMemoryAnswers.push(likedAnswer);

    const likeAuthor = generateRandomUser();
    const newLikeAuthor = generateRandomUser();

    inMemoryUsers.push(likeAuthor);
    inMemoryUsers.push(newLikeAuthor);

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


    it('should fail if there is already like gave by the user in the answer', async () => {

        const response = await service.execute({
            userId: likeAuthor.id,
            answerId: likedAnswer.id
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('This user already gaved a like to this answer');
    });

    
    it('should be able to crate like', async () => {

        const response = await service.execute({
            userId: newLikeAuthor.id,
            answerId: likedAnswer.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBeInstanceOf(Like);
    });
});