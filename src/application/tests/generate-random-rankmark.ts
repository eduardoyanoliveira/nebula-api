import { Rankmark } from "../domain/entities/Rankmark";
import { RankmarkFactory } from "../domain/factories/Rankmark//factory-class";
import { getRandomNumberMax } from "../utils/random-number/random-number-max";

const rankmarkFactory = new RankmarkFactory();

const rankmark_one = rankmarkFactory.create('rankmark_one', '#fff', 50);
const rankmark_two = rankmarkFactory.create('rankmark_two', 'red', 20);
const rankmark_three = rankmarkFactory.create('rankmark_three', '#000', 90);
const rankmark_four = rankmarkFactory.create('rankmark_four', 'blue', 500);
const rankmark_five = rankmarkFactory.create('rankmark_one', '#fff', 200);
const rankmark_six = rankmarkFactory.create('rankmark_one', 'green', 10);

const rankmarks : Rankmark[] = [
    rankmark_one,
    rankmark_two,
    rankmark_three,
    rankmark_four,
    rankmark_five,
    rankmark_six
];

export const generateRandomRankmark = () : Rankmark => {

    const randomNumber = getRandomNumberMax(rankmarks.length -1 );
    return rankmarks[randomNumber];
};