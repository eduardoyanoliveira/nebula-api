import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { generateRandomRankmark } from "../../../tests/generators/generate-random-rankmark";
import { InMemoryListRankmarksRepository, inMemoryRankmarks } from "../../../tests/repositories/Rankmark/in-memory-rankmark-repository";
import { ListRankmarksService } from "./list-rankmarks-service";

describe('List rankmarks service', () => {

    const listRankmarksReposoitory = new InMemoryListRankmarksRepository();

    const service = new ListRankmarksService(listRankmarksReposoitory);

    const rankmark_one = generateRandomRankmark();
    const rankmark_two = generateRandomRankmark();

    inMemoryRankmarks.push(rankmark_one);
    inMemoryRankmarks.push(rankmark_two);

    it('should return a list of rankmarks', async () => {
        const response : Result<Rankmark[]> = await service.execute({});

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue().length).toBe(2);
        expect(response.getValue()[0]).toBeInstanceOf(Rankmark);
    })
});