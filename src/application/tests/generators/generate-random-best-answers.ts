import { BestAnswer } from "../../domain/entities/Interactions/BestAnswer";
import { Question } from "../../domain/entities/Interactions/Question";
import { User } from "../../domain/entities/User";
import { generateRandomAnswer } from "./generate-random-answer";
import { generateRandomQuestion } from "./generate-random-question";
import { generateRandomSubject } from "./generate-random-subject";
import { generateRandomUser } from "./generate-random-user";

const randomUser = generateRandomUser();
const randomUserTwo = generateRandomUser();
const randomSubject = generateRandomSubject();
const randomQuestion = generateRandomQuestion(randomUser, randomSubject);
const randomAnswer = generateRandomAnswer(randomUserTwo, randomQuestion);

interface IThisProps {
    answerAuthor?: User,
    answerQuestion?: Question
};

/**
 * @param answerAuthor => If informed the answer author will be replaced with the given value
 * @returns a BestAnswer instance
 */
export const generateRandomBestAnswer = ({ answerAuthor, answerQuestion } : IThisProps) => {
    
    const answer = randomAnswer;
    let question = randomQuestion;

    if(answerAuthor) { 
        answer.props.author = answerAuthor
    };

    if(answerQuestion){
        question = answerQuestion; 
    }

    return BestAnswer.create({
        answer: answer,
        question: question
    });
};
