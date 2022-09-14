import { generateRandomBestAnswer } from "../../../tests/generate-random-best-answers";
import { generateRandomQuestion } from "../../../tests/generate-random-question";
import { generateRandomSubject } from "../../../tests/generate-random-subject";
import { generateRandomUser } from "../../../tests/generate-random-user";
import { inMemoryBestAnswers, InMemoryFindBestAnswerByQuestionRepository } from "../../../tests/repositories/BestAnswer/in-memory-best-answer-repository";
import { InMemoryFindQuestionByIdRepository, inMemoryQuestions } from "../../../tests/repositories/Question/in-memory-question-repository";
import { inMemoryUsers } from "../../../tests/repositories/User/in-memory-user-repo";
import { RemoveBestAnswerByQuestionService } from "./remove-best-answer-by-question-service";

describe('Remove Best answer by question tests', () => {

    const inMemoryFindQuestionById = new InMemoryFindQuestionByIdRepository();
    const inMemoryFindBestAnswerByQuestion = new InMemoryFindBestAnswerByQuestionRepository();

    const randomUser = generateRandomUser();
    const randomSubject = generateRandomSubject();

    const randomQuestion = generateRandomQuestion(randomUser, randomSubject);

    const randomBestAnswer = generateRandomBestAnswer({answerQuestion: randomQuestion});

    inMemoryUsers.push(randomUser);
    inMemoryQuestions.push(randomQuestion);
    inMemoryBestAnswers.push(randomBestAnswer);

    const service = new RemoveBestAnswerByQuestionService(inMemoryFindQuestionById, inMemoryFindBestAnswerByQuestion);

    
    it('should fail if the question does not exists', async () => {

        const response = await service.execute({
            questionId: 'fake-wrong-test-id'
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should be able to remove the question best answer', async () => {

        const response = await service.execute({
            questionId: randomQuestion.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBe(randomBestAnswer);
    });
});