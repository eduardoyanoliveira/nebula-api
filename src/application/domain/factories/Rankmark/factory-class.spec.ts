import { Rankmark } from "../../entities/Rankmark";
import { RankmarkFactory } from "./factory-class";

describe('Rankmark factory class', () => {

    const factory = new RankmarkFactory();

    it('should be able to create a rankmark', () => {
        const rankmark = factory.create('test_rankmark', '#fff', 800);
       
        expect(rankmark).toBeTruthy();
        expect(rankmark).toBeInstanceOf(Rankmark);
    })
});