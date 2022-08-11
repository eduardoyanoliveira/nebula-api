import { Content } from '../domain/entities/Content';
import { Subject } from '../domain/entities/Subject';
import { ContentFactory } from '../domain/factories/Content/factory-class';
import { getRandomNumberMax } from '../utils/random-number/random-number-max';

const factory = new ContentFactory();



const content_one =  { description :'content_one', url: 'http://content_one.com' };
const content_two = { description: 'content_two', url: 'http://content_two.com' };
const content_three = { description:'content_three', url: 'http://content_three.com' };
const content_four = { description: 'content_four', url: 'http://content_four.com' };
const content_five = { description: 'content_five', url: 'http://content_five.com' };


const contentsBase = [
    content_one,
    content_two,
    content_three,
    content_four,
    content_five
];

/**
 * 
 * @param subject Content's subject
 * @returns a random content with the given subject
 */
export const generateRandomContent = (subject: Subject) : Content => {

    const randomNumber = getRandomNumberMax(contentsBase.length -1 );
    const contentBase = contentsBase[randomNumber];
    return factory.create( contentBase.description, contentBase.url, subject);
};