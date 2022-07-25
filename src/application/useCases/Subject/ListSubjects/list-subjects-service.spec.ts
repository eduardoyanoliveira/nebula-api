import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { InMemoryListSubjectsRepository, inMemorySubjects } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListSubjectsService } from "./list-subjects-service";

describe('List subjects service', () => {
    
    const listSubjectsRepository = new InMemoryListSubjectsRepository();
    const service = new ListSubjectsService(listSubjectsRepository);

    const subject_one = generateRandomSubject();
    const subject_two = generateRandomSubject();

    inMemorySubjects.push(subject_one);
    inMemorySubjects.push(subject_two);
      
    
    it('should return a list of subjects', async () => {

        const response : Result<Subject[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toEqual(2);
    });
});