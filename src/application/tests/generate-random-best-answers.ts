import { BestAnswer } from "../domain/entities/Interactions/BestAnswer";
import { User } from "../domain/entities/User";
import { generateRandomAnswer } from "./generate-random-answer";
import { generateRandomQuestion } from "./generate-random-question";
import { generateRandomSubject } from "./generate-random-subject";
import { generateRandomUser } from "./generate-random-user";

const randomUser = generateRandomUser();
const randomUserTwo = generateRandomUser();
const randomSubject = generateRandomSubject();
const randomQuestion = generateRandomQuestion(randomUser, randomSubject);
const randomAnswer = generateRandomAnswer(randomUserTwo, randomQuestion);

/**
 * @param answerAuthor => If informed the answer author will be replaced with the given value
 * @returns a BestAnswer instance
 */
export const generateRandomBestAnswer = (answerAuthor?: User) => {
    
    const answer = randomAnswer;

    if(answerAuthor) { 
        answer.props.author = answerAuthor
    };

    return BestAnswer.create({
        answer: answer,
        question: randomQuestion
    });
};
