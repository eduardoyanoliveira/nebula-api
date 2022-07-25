import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { generateRandomContent } from "../../../../tests/generate-random-contents";
import { InMemoryContentRepository } from "../../../../tests/repositories/Content/in-memory-content-repository";
import { InMemoryFindSubjectByIdRepository, inMemorySubjects } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { UpdateContentService } from "./update-content-service";


describe('Update content service', () => {

    const findSubjectByIdRepository = new InMemoryFindSubjectByIdRepository();
    const contentRepository = new InMemoryContentRepository();
    const service = new UpdateContentService( findSubjectByIdRepository, contentRepository );

    const subjectThatExists = generateRandomSubject();
    const contentThatExists = generateRandomContent( subjectThatExists );

    inMemorySubjects.push(subjectThatExists);
    contentRepository.contents.push(contentThatExists);

    afterAll(() => {
        contentRepository.contents = [];
    });

    it('should fail if the content does not exists', async () => {

        const response = await service.execute({
            id: 'fake-wrong-id',
            url: 'http://new_url.com',
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should fail if the subject does not exists', async () => {

        const response = await service.execute({
            id: contentThatExists.id,
            subject_id: 'fake-wrong-id'
        });

        expect(response.isFailure).toBeTruthy();
    });


    it('should be able to update the content', async () => {

        const response = await service.execute({
            id: contentThatExists.id,
            url: 'http://new_url.com',
            description: "it's up to date"
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().props.url).toBe('http://new_url.com');
        expect(response.getValue().props.description).toBe("it's up to date");
    });
    

    it('should be able to change content subject', async () => {

        const newSubject = generateRandomSubject();

        inMemorySubjects.push(newSubject);

        const response = await service.execute({
            id: contentThatExists.id,
            subject_id: newSubject.id
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().props.subject.id).toBe(newSubject.id);
    });

});