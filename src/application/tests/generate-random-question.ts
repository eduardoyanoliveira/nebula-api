import { Question } from '../domain/entities/Interactions/Question';
import { Subject } from '../domain/entities/Subject';
import { User } from '../domain/entities/User';
import { QuestionFactory } from '../domain/factories/Question/factory-class';
import { getRandomNumberMax } from '../utils/random-number/random-number-max';

const factory = new QuestionFactory();



const question_one =  { title :'question_one', text: 'question_one desc', is_public: false };
const question_two = { title: 'question_two', text: 'question_two desc', is_public: false};
const question_three = { title:'question_three', text: 'question_three desc', is_public: true};
const question_four = { title: 'question_four', text: 'question_four desc', is_public: false};
const question_five = { title: 'question_five', text: 'question_five desc', is_public: true };


const questionsBase = [
    question_one,
    question_two,
    question_three,
    question_four,
    question_five
];

/**
 * @param author Question's user author
 * @param subject Question's subject
 * @returns a random question with the given subject
 */
export const generateRandomQuestion = (author: User, subject: Subject) : Question => {

    const randomNumber = getRandomNumberMax(questionsBase.length -1 );
    const question = questionsBase[randomNumber];
    return factory.create( question.title, question.text, question.is_public, author, subject);
};