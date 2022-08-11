import { Result } from "../../../core/Result";
import { Subject } from "../../../domain/entities/Subject";
import { generateRandomSubject } from "../../../tests/generate-random-subject";
import { InMemoryCreateSubjectRepository, InMemoryFindSubjectByNameRepository, inMemorySubjects } from "../../../tests/repositories/Subject/in-memory-subject-repo";
import { CreateSubjectService } from "./create-subject-service";

describe('Create subject service', () => {

    const findSubjectByNameRepository = new InMemoryFindSubjectByNameRepository();
    const createSubjectRepository = new InMemoryCreateSubjectRepository();

    const service = new CreateSubjectService(findSubjectByNameRepository, createSubjectRepository);

    const subjectThatAlreadyExists = generateRandomSubject();
    inMemorySubjects.push(subjectThatAlreadyExists);


    it('should fail with there is already a subject with the given name resgistered on database', async () => {

        const response : Result<Subject> = await service.execute({name: subjectThatAlreadyExists.props.name});

        expect(response.isFailure).toBeTruthy();

        expect(response.error).toBe('Name is already taken');
    });

    
    it('should be able to create a subject', async () => {

        const response : Result<Subject> = await service.execute({ name: 'subject-name' });

        expect(response.isSuccess).toBeTruthy();
    });

});