import { Question } from "../../entities/Interactions/Question";
import { QuestionFactory } from "./factory-class";
import { generateRandomUser } from '../../../tests/generate-random-user';
import { generateRandomSubject } from '../../../tests/generate-random-subject';

describe('Create question factory', () => {

    const questionFactory = new QuestionFactory();
    const randomUser = generateRandomUser();
    const randomSubject = generateRandomSubject();

    it('should create a public question', () => {

        const question = questionFactory.create('title_test', 'a simple text', true, randomUser, randomSubject);

        expect(question).toBeInstanceOf(Question);
        expect(question.props.is_public).toBeTruthy()
    });


    it('should create a private question', () => {

        const response = questionFactory.create('title_test', 'a simple text', false , randomUser, randomSubject);

        expect(response).toBeInstanceOf(Question);
        expect(response.props.is_public).toBeFalsy()
    });

});