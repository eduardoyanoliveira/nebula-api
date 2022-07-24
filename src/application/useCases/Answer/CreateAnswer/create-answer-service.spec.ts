import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';
import { generateRandomQuestion } from '../../../../tests/generate-random-question';
import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../../tests/repositories/User/in-memory-user-repo';
import { InMemoryQuestionRepository } from '../../../../tests/repositories/Question/in-memory-question-repository';
import { InMemoryAnswerRepository } from '../../../../tests/repositories/Answer/in-memory-answer-repository';
import { CreateAnswerService } from './create-answer-service';
import { AnswerFactory } from '../../../../domain/factories/Answer/factory-class';
import { Answer } from '../../../../domain/entities/Interactions/Answer';
import { Result } from '../../../../core/Result';

describe( 'Create answer service' ,() =>{

    const factory = new AnswerFactory();

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const questionRepository = new InMemoryQuestionRepository();
    const answerRepository = new InMemoryAnswerRepository();

    const service = new CreateAnswerService(findUserByIdRepository, questionRepository, answerRepository, factory);
    

    const question_user = generateRandomUser();
    const answer_user = generateRandomUser();

    const subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, subject);

    inMemoryUsers.push(answer_user);
    inMemoryUsers.push(question_user);

    questionRepository.questions.push(question);

    afterAll(() =>{
        questionRepository.questions = [];
    });


    it('should fail if the user does not exist', async () => {

        const response: Result<Answer> = await service.execute({
            text: 'Answer test text',
            user_id: 'fake-wrong-id',
            question_id: question.id
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should fail if the question does not exist', async () => {

        const response: Result<Answer> = await service.execute({
            text: 'Answer test text',
            user_id: answer_user.id,
            question_id: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to create a answer', async () => {

        const response: Result<Answer> = await service.execute({
            text: 'Answer test text',
            user_id: answer_user.id,
            question_id: question.id
        });

        expect(response.isSuccess).toBeTruthy();

        expect(response.getValue()).toBeInstanceOf(Answer);
    });

});