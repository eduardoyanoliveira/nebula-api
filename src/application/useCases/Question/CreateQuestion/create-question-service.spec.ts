import { InMemoryFindUserByIdRepository, inMemoryUsers } from '../../../../tests/repositories/User/in-memory-user-repo';
import { InMemorySubjectRepo } from '../../../../tests/repositories/Subject/in-memory-subject-repo';
import { InMemoryQuestionRepository } from '../../../../tests/repositories/Question/in-memory-question-repository';
import { QuestionFactory } from '../../../../domain/factories/Question/factory-class';
import { generateRandomUser } from '../../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../../tests/generate-random-subject';
import { CreateQuestionService } from './create-question-service';
import { Result } from '../../../../core/Result';
import { Question } from '../../../../domain/entities/Interactions/Question';

describe('Create question service', () => {

    const findUserByIdRepository = new InMemoryFindUserByIdRepository();
    const subjectRepository = new InMemorySubjectRepo();
    const questionRepository = new InMemoryQuestionRepository();
    const factory = new QuestionFactory();

    const service = new CreateQuestionService(factory, findUserByIdRepository, subjectRepository, questionRepository);

    const userThatExists = generateRandomUser();
    const subjectThatExists = generateRandomSubject();

    inMemoryUsers.push(userThatExists);
    subjectRepository.subjects.push(subjectThatExists);


    afterAll(() => {
        subjectRepository.subjects = [];
    });


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