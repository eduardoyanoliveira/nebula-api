import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { generateRandomContent } from "../../../tests/generators/generate-random-contents";
import { generateRandomSubject } from "../../../tests/generators/generate-random-subject";
import { InMemoryListContentsRepository, inMemoryContents } from "../../../tests/repositories/Content/in-memory-content-repository";
import { inMemorySubjects } from "../../../tests/repositories/Subject/in-memory-subject-repo";
import { ListContentsService } from "./list-contents-service"

describe('List contents service', () => {

    const listContentsRepository = new InMemoryListContentsRepository();

    const service = new ListContentsService(listContentsRepository);

    const subject = generateRandomSubject();

    const other_subject = generateRandomSubject();

    const content_one = generateRandomContent(subject);
    const content_two = generateRandomContent(subject);

    inMemorySubjects.push(subject);
    inMemorySubjects.push(other_subject);

    inMemoryContents.push(content_one);
    inMemoryContents.push(content_two);


    it('should be able to list a content array', async () => {

        const response : Result<Content[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
    });

});