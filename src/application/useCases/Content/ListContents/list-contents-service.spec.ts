import { Result } from "../../../../core/Result";
import { Content } from "../../../../domain/entities/Content";
import { generateRandomContent } from "../../../../tests/generate-random-contents";
import { generateRandomSubject } from "../../../../tests/generate-random-subject";
import { InMemoryContentRepository } from "../../../../tests/repositories/Content/in-memory-content-repository";
import { InMemorySubjectRepo } from "../../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListContentsService } from "./list-contents-service"

describe('List contents service', () => {

    const subjectRepository = new InMemorySubjectRepo();
    const contentRepository = new InMemoryContentRepository();

    const service = new ListContentsService(contentRepository);

    const subject = generateRandomSubject();

    const other_subject = generateRandomSubject();

    const content_one = generateRandomContent(subject);
    const content_two = generateRandomContent(subject);

    subjectRepository.subjects.push(subject);
    subjectRepository.subjects.push(other_subject);

    contentRepository.contents.push(content_one);
    contentRepository.contents.push(content_two);

    afterAll(() => {
        subjectRepository.subjects = [];
        contentRepository.contents = [];
    });


    it('should be able to list a content array', async () => {

        const response : Result<Content[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
    });

});