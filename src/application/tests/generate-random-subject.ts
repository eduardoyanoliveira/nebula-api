import { Subject } from "../domain/entities/Subject";
import { SubjectFactory } from "../domain/factories/Subject/factory-class";
import { getRandomNumberMax } from "../utils/random-number/random-number-max";

const subjectFactory = new SubjectFactory();

const subject_one = subjectFactory.create('subject_one');
const subject_two = subjectFactory.create('subject_two');
const subject_three = subjectFactory.create('subject_three');
const subject_four = subjectFactory.create('subject_four');
const subject_five = subjectFactory.create('subject_five');
const subject_six = subjectFactory.create('subject_six');

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