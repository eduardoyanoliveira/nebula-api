import { Result } from "../../../../core/Result";
import { Rankmark } from "../../../../domain/entities/Rankmark";
import { RankmarkFactory } from "../../../../domain/factories/Rankmark/factory-class";
import { generateRandomRankmark } from "../../../../tests/generate-random-rankmark";
import { InMemoryRankmarkRepository } from "../../../../tests/repositories/Rankmark/in-memory-rankmark-repository";
import { CreateRankmarkService } from "./create-rankmark-service";

describe('Create rankmark service', () => {

    const factory = new RankmarkFactory();
    const repository = new InMemoryRankmarkRepository();
    const service = new CreateRankmarkService( factory ,repository );

    const rankmarkThatAlreadyExists = generateRandomRankmark();

    repository.rankmarks.push(rankmarkThatAlreadyExists);

    afterAll(() => {
        repository.rankmarks = [];
    });

    it('should fail with there is already a rankmark on database with the given name', async () => {
        
        const response : Result<Rankmark> = await service.execute({
            name: rankmarkThatAlreadyExists.props.name,
            color: 'color',
            points:  50
        });

        expect(response.isFailure).toBeTruthy();
    });

    it('should be able to create a rankmark', async () => {
        
        const response : Result<Rankmark> = await service.execute({
            name: 'rankmark_test_create',
            color: 'color',
            points:  50
        });

        expect(response.isSuccess).toBeTruthy();
        expect(response.getValue()).toBeInstanceOf(Rankmark);
    });

});