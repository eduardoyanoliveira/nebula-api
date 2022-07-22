import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { InMemorySubjectRepo } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListSubjectsService } from "./list-subjects-service";

describe('List subjects service', () => {
    
    const repository = new InMemorySubjectRepo();
    const service = new ListSubjectsService(repository);

    const subject_one = generateRandomSubject();
    const subject_two = generateRandomSubject();

    repository.subjects.push(subject_one);
    repository.subjects.push(subject_two);
      
    afterAll(() => {
        repository.subjects = [];
    });
      
    
    it('should return a list of subjects', async () => {

        const response : Result<Subject[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toEqual(2);
    });
});