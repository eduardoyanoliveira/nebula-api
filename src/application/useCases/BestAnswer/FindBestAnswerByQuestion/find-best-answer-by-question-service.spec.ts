import { FindBestAnswerByQuestionService } from "./find-best-answer-by-question-service";
import { InMemoryFindQuestionByIdRepository, inMemoryQuestions } from '../../../tests/repositories/Question/in-memory-question-repository';
import { inMemoryBestAnswers, InMemoryFindBestAnswerByQuestionRepository } from "../../../tests/repositories/BestAnswer/in-memory-best-answer-repository";
import { generateRandomQuestion } from "../../../tests/generators/generate-random-question";
import { generateRandomUser } from "../../../tests/generators/generate-random-user";
import { generateRandomSubject } from "../../../tests/generators/generate-random-subject";
import { generateRandomBestAnswer } from "../../../tests/generators/generate-random-best-answers";
import { inMemoryUsers } from "../../../tests/repositories/User/in-memory-user-repo";

describe('Find best answer by question tests', () => {

    const inMemoryFindQuestionById = new InMemoryFindQuestionByIdRepository();
    const inMemoryFindBestAnswerByQuestion = new InMemoryFindBestAnswerByQuestionRepository();

    const randomUser = generateRandomUser();
    const randomSubject = generateRandomSubject();

    const randomQuestion = generateRandomQuestion(randomUser, randomSubject);

    const randomBestAnswer = generateRandomBestAnswer({answerQuestion: randomQuestion});

    inMemoryUsers.push(randomUser);
    inMemoryQuestions.push(randomQuestion);
    inMemoryBestAnswers.push(randomBestAnswer);

    const service = new FindBestAnswerByQuestionService(inMemoryFindQuestionById, inMemoryFindBestAnswerByQuestion);

    it('should fail if the question does not exists', async () => {

        const response = await service.execute({
            questionId: 'fake-wrong-test-id'
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should be able to find the question best answer',async () => {

        const response = await service.execute({
            questionId: randomQuestion.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBe(randomBestAnswer);
    });

});