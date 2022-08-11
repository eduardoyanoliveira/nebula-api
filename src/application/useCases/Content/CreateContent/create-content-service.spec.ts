import { ContentFactory } from '../../../domain/factories/Content/factory-class';
import { InMemoryCreateContentRepository } from '../../../tests/repositories/Content/in-memory-content-repository';
import { InMemoryFindSubjectByIdRepository, inMemorySubjects } from '../../../tests/repositories/Subject/in-memory-subject-repo';
import { CreateContentService } from './create-content-service';
import { generateRandomSubject } from '../../../tests/generate-random-subject';
import { Content } from '../../../domain/entities/Content';
import { Result } from '../../../core/Result';

describe('Create content service', ()  => {

    const factory = new ContentFactory();
    const findSubjectByIdRepository = new InMemoryFindSubjectByIdRepository();
    const createContentRepository = new InMemoryCreateContentRepository();

    const service = new CreateContentService(
        findSubjectByIdRepository, 
        factory, 
        createContentRepository
    );

    const subjectThatExists = generateRandomSubject();

    inMemorySubjects.push(subjectThatExists);

    it('should fail if the subject does not exists', async () => {
        const response : Result<Content> = await service.execute({
            description: 'any-description',
            url: 'http://testerror.com',
            subject_id: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();

    });

    
    it('should be able to create a content', async () => {

        const response : Result<Content> = await service.execute({
            description: 'any-description',
            url: 'http://test.com',
            subject_id: subjectThatExists.id
        });

        expect(response.isSuccess).toBeTruthy();

        expect(response.getValue()).toBeInstanceOf(Content);

    });
});