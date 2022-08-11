import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { generateRandomSubject } from "../../../tests/generate-random-subject";
import { InMemoryFindSubjectByIdRepository, InMemoryUpdateSubjectRepository, inMemorySubjects } from "../../../tests/repositories/Subject/in-memory-subject-repo";
import { UpdateSubjectService } from "./update-subject-service";

describe('Update subject service', () => {

    const findSubjectByIdRepository = new InMemoryFindSubjectByIdRepository();
    const updateSubjectRepository = new InMemoryUpdateSubjectRepository();
    const service = new UpdateSubjectService(findSubjectByIdRepository, updateSubjectRepository);

    const subjectThatExists = generateRandomSubject();
    inMemorySubjects.push(subjectThatExists);

    it('should faild with the subject does not exist', async () => {

        const response : Result<Subject> = await service.execute({
            id: 'fake-test-id',
            name: 'new-name' 
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to update the subject', async () => {

        const response : Result<Subject> = await service.execute({
            id: subjectThatExists.id,
            name: 'new-name' 
        });

        expect(response.isSuccess).toBeTruthy();
    });

});