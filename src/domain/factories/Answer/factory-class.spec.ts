import { generateRandomSubject } from "../../../tests/generate-random-subject";
import { generateRandomUser } from "../../../tests/generate-random-user";
import { generateRandomQuestion } from '../../../tests/generate-random-question';
import { AnswerFactory } from "./factory-class";
import { Answer } from "../../entities/Interactions/Answer";

describe('Answer Factory class', () => {

    const answer_user = generateRandomUser();
    const question_user = generateRandomUser();

    const subject = generateRandomSubject();

    const question = generateRandomQuestion(question_user, subject);

    const factory = new AnswerFactory()

    it('should be able to create a answer', () => {
        const response = factory.create(
            'Random test factory answer',
            answer_user,
            question
        );

        expect(response).toBeInstanceOf(Answer);
    });
});