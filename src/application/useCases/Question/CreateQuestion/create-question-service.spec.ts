import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../tests/repositories/User/in-memory-user-repo';
import { InMemoryFindSubjectByIdRepository, inMemorySubjects } from '../../../tests/repositories/Subject/in-memory-subject-repo';
import { InMemoryCreateQuestionRepository } from '../../../tests/repositories/Question/in-memory-question-repository';
import { QuestionFactory } from '../../../domain/factories/Question/factory-class';
import { generateRandomUser } from '../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../tests/generate-random-subject';
import { CreateQuestionService } from './create-question-service';
import { Result } from '../../../core/Result';
import { Question } from '../../../domain/entities/Interactions/Question';

describe('Create question service', () => {

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const findSubjectByIdRepository = new InMemoryFindSubjectByIdRepository();
    const createQuestionRepository = new InMemoryCreateQuestionRepository();

    const factory = new QuestionFactory();

    const service = new CreateQuestionService(
        factory, 
        findUserByIdRepository, 
        findSubjectByIdRepository, 
        createQuestionRepository
    );

    const userThatExists = generateRandomUser();
    const subjectThatExists = generateRandomSubject();

    inMemoryUsers.push(userThatExists);
    inMemorySubjects.push(subjectThatExists);

    it('should fail if the user does not exists', async () => {

        const response : Result<Question> = await service.execute({
            title: 'random-title',
            text: 'random question text',
            is_public: true,
            author_id: 'fake-wrong-id',
            subject_id: subjectThatExists.id
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should fail if the subject does not exists', async () => {

        const response : Result<Question> = await service.execute({
            title: 'random-title',
            text: 'random question text',
            is_public: true,
            author_id: userThatExists.id,
            subject_id: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should be able to create a question', async () => {

        const response : Result<Question> = await service.execute({
            title: 'random-title',
            text: 'random question text',
            is_public: true,
            author_id: userThatExists.id,
            subject_id: subjectThatExists.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBeInstanceOf(Question);
    });

});