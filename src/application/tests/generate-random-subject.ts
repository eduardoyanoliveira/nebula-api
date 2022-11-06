import { Subject } from "../domain/entities/Subject";
import { getRandomNumberMax } from "../utils/random-number/random-number-max";


const subject_one = Subject.create({ name: 'subject_one'});
const subject_two = Subject.create({ name:'subject_two' });
const subject_three = Subject.create({ name:'subject_three' });
const subject_four = Subject.create({ name:'subject_four' });
const subject_five = Subject.create({ name:'subject_five'});
const subject_six = Subject.create({ name: 'subject_six' });

const subjects : Subject[] = [
    subject_one,
    subject_two,
    subject_three,
    subject_four,
    subject_five,
    subject_six
];

export const generateRandomSubject = () : Subject => {

    const randomNumber = getRandomNumberMax(subjects.length -1 );
    return subjects[randomNumber];
};