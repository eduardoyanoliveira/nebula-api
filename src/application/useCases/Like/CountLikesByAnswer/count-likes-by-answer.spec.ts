import { CountLikesByAnswerService } from "./count-likes-by-answer";
import { InMemoryCountLikesByAnswerRepository, inMemoryLikes } from '../../../tests/repositories/Like/in-memory-like-repository';
import { inMemoryUsers } from '../../../tests/repositories/User/in-memory-user-repo';
import { inMemoryAnswers, InMemoryFindAnswerByIdRepository } from '../../../tests/repositories/Answer/in-memory-answer-repository';
import { generateRandomAnswer } from "../../../tests/generators/generate-random-answer";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";
import { generateRandomQuestion } from "../../../tests/generators/generate-random-question";
import { generateRandomSubject } from "../../../tests/generators/generate-random-subject";
import { generateRandomLike } from "../../../tests/generators/generate-random-like";

describe('Count Likes by Answer tests', () => {


    const findAnswerByIdRepository = new InMemoryFindAnswerByIdRepository();
    const countLikesByAnswerRepository = new InMemoryCountLikesByAnswerRepository();

    const service = new CountLikesByAnswerService(
        findAnswerByIdRepository,
        countLikesByAnswerRepository,
    );

    const questionUser = generateRandomUser();
    const questionSubject = generateRandomSubject();
    const randomQuestion = generateRandomQuestion(questionUser, questionSubject);

    const answerUser = generateRandomUser();
    const likedAnswer = generateRandomAnswer(answerUser, randomQuestion);

    inMemoryAnswers.push(likedAnswer);

    const firstLikeAuthor = generateRandomUser();
    const secondLikeAuthor = generateRandomUser();

    inMemoryUsers.push(firstLikeAuthor);
    inMemoryUsers.push(secondLikeAuthor);

    const firstLike = generateRandomLike({ likeAuthor: firstLikeAuthor, likedAnswer });
    const secondLike = generateRandomLike({ likeAuthor: secondLikeAuthor, likedAnswer });

    inMemoryLikes.push(firstLike, secondLike);


    
    it('should fail if the answer does not exist', async () => {

        const response = await service.execute({
            answerId: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('Could not find the answer by the given id');
    });


    it('should be able to retrive a list of likes from the database', async () => {

        const response = await service.execute({
            answerId: likedAnswer.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBe(2);
    });
});