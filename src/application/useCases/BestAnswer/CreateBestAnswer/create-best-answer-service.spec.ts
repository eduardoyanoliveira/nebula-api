import { generateRandomAnswer } from '../../../tests/generators/generate-random-answer';
import { generateRandomQuestion } from '../../../tests/generators/generate-random-question';
import { generateRandomSubject } from '../../../tests/generators/generate-random-subject';
import { generateRandomUser } from '../../../tests/generators/generate-random-user';
import { inMemoryAnswers, InMemoryFindAnswerByIdRepository } from '../../../tests/repositories/Answer/in-memory-answer-repository';
import { InMemoryFindQuestionByIdRepository, inMemoryQuestions } from '../../../tests/repositories/Question/in-memory-question-repository';
import { inMemoryUsers } from '../../../tests/repositories/User/in-memory-user-repo';
import { InMemoryCreateBestAnswerRepository } from '../../../tests/repositories/BestAnswer/in-memory-best-answer-repository';
import { CreateBestAnswerService } from './create-best-answer-service';
import { BestAnswer } from '../../../domain/entities/Interactions/BestAnswer';

describe('Create best answer tests' , () => {

    const answerRepository = new InMemoryFindAnswerByIdRepository();
    const questionRepository = new InMemoryFindQuestionByIdRepository();
    const createBestAnswerRepository = new InMemoryCreateBestAnswerRepository();
    const service = new CreateBestAnswerService(questionRepository, answerRepository, createBestAnswerRepository);

    const question_user = generateRandomUser();
    const answer_user = generateRandomUser();

    const question_subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, question_subject);
    const another_question = generateRandomQuestion(question_user, question_subject);

    const answer = generateRandomAnswer(answer_user, question);
    const another_answer = generateRandomAnswer(answer_user, another_question);

    inMemoryUsers.push(question_user);
    inMemoryUsers.push(answer_user);

    inMemoryQuestions.push(question);
    inMemoryQuestions.push(another_question);
    inMemoryAnswers.push(answer);
    inMemoryAnswers.push(another_answer);

    it('should fail if the answer is not an answer of the question', async () => {
        const response = await service.execute({

            answer_id: another_answer.id,
            question_id: question.id
        });

        expect(response.isFailure).toBeTruthy();
        expect(response.error).toBe('Only answers linked with the question can be selected as the best answer');
    });

    it('should fail if the question does not exists', async () => {
        const response = await service.execute({
            answer_id: answer.id,
            question_id: 'fake-wrong-test-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should fail if the answer does not exists', async () => {
        const response = await service.execute({
            answer_id: 'fake-wrong-test-id',
            question_id: question.id
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to create a new best answer', async () => {
        const response = await service.execute({
            answer_id: answer.id,
            question_id: question.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBeInstanceOf(BestAnswer);
    });

});