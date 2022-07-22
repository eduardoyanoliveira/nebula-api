import { Answer } from '../domain/entities/Interactions/Answer';
import { User } from '../domain/entities/User';
import { getRandomNumberMax } from '../utils/random-number/random-number-max';
import { AnswerFactory } from '../domain/factories/Answer/factory-class';
import { Question } from '../domain/entities/Interactions/Question';

const factory = new AnswerFactory();


const answer_one =  { text: 'answer_one desc' };
const answer_two = { text: 'answer_two desc' };
const answer_three = { text: 'answer_three desc' };
const answer_four = { text: 'answer_four desc' };
const answer_five = { text: 'answer_five desc' };


const answersBase = [
    answer_one,
    answer_two,
    answer_three,
    answer_four,
    answer_five
];

/**
 * @param author Answer's user author
 * @param question that answer tries solve
 * @returns a random answer with the given subject
 */
export const generateRandomAnswer = (author: User, question: Question) : Answer => {

    const randomNumber = getRandomNumberMax(answersBase.length -1 );
    const answer = answersBase[randomNumber];
    return factory.create( answer.text, author, question);
};