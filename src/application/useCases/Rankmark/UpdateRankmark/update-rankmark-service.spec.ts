import { Result } from "../../../core/Result";
import { Rankmark } from "../../../domain/entities/Rankmark";
import { generateRandomRankmark } from "../../../tests/generators/generate-random-rankmark";
import { InMemoryFindRankmarkByIdRepository, InMemoryUpdateRankmarkRepository, inMemoryRankmarks } from "../../../tests/repositories/Rankmark/in-memory-rankmark-repository";
import { UpdateRankmarkService } from "./update-rankmark-service";

describe('Update rankmark service', () => {

    const findRankmarkByIdRepository = new InMemoryFindRankmarkByIdRepository();
    const updateRankmarkRepository = new InMemoryUpdateRankmarkRepository();

    const service = new UpdateRankmarkService(findRankmarkByIdRepository, updateRankmarkRepository);

    const rankmarkThatExists = generateRandomRankmark();
    inMemoryRankmarks.push(rankmarkThatExists);

    it('should return an erro if the rankmark does not exist', async ()=> {
        const response : Result<Rankmark> = await service.execute({
            id: 'fake-wrong-id',
            name: 'other-name'
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to update a rankmark', async ()=> {
        const response : Result<Rankmark> = await service.execute({
            id: rankmarkThatExists.id,
            name: 'other-name'
        });

        expect(response.isSuccess).toBeTruthy();
    });

});