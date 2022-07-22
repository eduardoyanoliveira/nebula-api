import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { generateRandomQuestion } from "../../../../tests/generate-random-question";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { generateRandomUser } from "../../../../tests/generate-random-user";
import { InMemoryQuestionRepository } from "../../../../tests/repositories/Question/in-memory-question-repository";
import { GetQuestionService } from "./get-question-service";


describe('Get question service', () => {

    const questionRepository = new InMemoryQuestionRepository();
    const service = new GetQuestionService(questionRepository);

    const randomUser = generateRandomUser();
    const randomSubject = generateRandomSubject();
    const question = generateRandomQuestion(randomUser, randomSubject);

    questionRepository.questions.push(question);

    afterAll(() => {
        questionRepository.questions = [];
    });


    it('should fail if the question does not exists', async () => {

        const response : Result<Question> = await service.execute({
            question_id: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to get a question', async () => {

        const response : Result<Question> = await service.execute({
            question_id: question.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBeInstanceOf(Question);
    });
});