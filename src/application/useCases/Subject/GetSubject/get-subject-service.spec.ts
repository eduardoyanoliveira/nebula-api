import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { InMemorySubjectRepo } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { GetSubjectService } from "./get-subject-service";

describe('Get subject service', () => {

    const repository = new InMemorySubjectRepo();
    const service = new GetSubjectService(repository);

    const subjectThatExists = generateRandomSubject();
    repository.subjects.push(subjectThatExists);

    afterAll(() => {
        repository.subjects = [];
    });


    it('should fail if the subject does not exist', async () => {
        const response = await service.execute({ id:'test-id' });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to get a subject', async () => {
        const response = await service.execute({ id: subjectThatExists.id });

        expect(response.isSuccess).toBeTruthy();
    });
});