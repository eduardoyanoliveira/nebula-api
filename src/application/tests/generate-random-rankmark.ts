import { Rankmark } from "../domain/entities/Rankmark";
import { getRandomNumberMax } from "../utils/random-number/random-number-max";


const rankmark_one = Rankmark.create({ name:'rankmark_one', color: '#fff', points: 50 });
const rankmark_two = Rankmark.create({ name:'rankmark_two', color: 'red', points: 20 });
const rankmark_three = Rankmark.create({ name:'rankmark_three', color: '#000', points: 90 });
const rankmark_four = Rankmark.create({ name: 'rankmark_four', color: 'blue', points: 500});
const rankmark_five = Rankmark.create({ name: 'rankmark_one', color: '#fff', points: 200});
const rankmark_six = Rankmark.create({ name: 'rankmark_one', color: 'green', points: 10 });

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