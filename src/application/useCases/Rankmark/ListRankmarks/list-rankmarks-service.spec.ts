import { Result } from "../../../../core/Result";
import { Rankmark } from "../../../../domain/entities/Rankmark";
import { generateRandomRankmark } from "../../../../tests/generate-random-rankmark";
import { InMemoryRankmarkRepository } from "../../../../tests/repositories/Rankmark/in-memory-rankmark-repository";
import { ListRankmarksService } from "./list-rankmarks-service";

describe('List rankmarks service', () => {

    const repository = new InMemoryRankmarkRepository();
    const service = new ListRankmarksService(repository);

    const rankmark_one = generateRandomRankmark();
    const rankmark_two = generateRandomRankmark();

    repository.rankmarks.push(rankmark_one);
    repository.rankmarks.push(rankmark_two);

    afterAll(() => {
        repository.rankmarks = [];
    });

    it('should return a list of rankmarks', async () => {
        const response : Result<Rankmark[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
        expect(response.getValue()[0]).toBeInstanceOf(Rankmark);
    })
});