import { generateRandomUser } from '../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../tests/generate-random-subject';
import { generateRandomQuestion } from '../../../tests/generate-random-question';
import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../tests/repositories/User/in-memory-user-repo';
import { InMemoryFindQuestionByIdRepository, inMemoryQuestions } from '../../../tests/repositories/Question/in-memory-question-repository';
import { InMemoryCreateAnswerRepository } from '../../../tests/repositories/Answer/in-memory-answer-repository';
import { CreateAnswerService } from './create-answer-service';
import { AnswerFactory } from '../../../domain/factories/Answer/factory-class';
import { Answer } from '../../../domain/entities/Interactions/Answer';
import { Result } from '../../../core/Result';

describe( 'Create answer service' ,() =>{

    const factory = new AnswerFactory();

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const findQuestionByIdRepository = new InMemoryFindQuestionByIdRepository();
    const createAnswerRepository = new InMemoryCreateAnswerRepository();

    const service = new CreateAnswerService(
        findUserByIdRepository,
        findQuestionByIdRepository,
        createAnswerRepository,
        factory
    );
    

    const question_user = generateRandomUser();
    const answer_user = generateRandomUser();

    const subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, subject);

    inMemoryUsers.push(answer_user);
    inMemoryUsers.push(question_user);

    inMemoryQuestions.push(question);


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