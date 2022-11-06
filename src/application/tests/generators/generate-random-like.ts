import { Answer } from "../../domain/entities/Interactions/Answer";
import { Like } from "../../domain/entities/Interactions/Like";
import { User } from "../../domain/entities/User";
import { generateRandomAnswer } from "./generate-random-answer";
import { generateRandomQuestion } from "./generate-random-question";
import { generateRandomSubject } from "./generate-random-subject";
import { generateRandomUser } from "./generate-random-user";

const randomUser = generateRandomUser();
const randomUserTwo = generateRandomUser();
const randomUserThree = generateRandomUser();
const randomSubject = generateRandomSubject();
const randomQuestion = generateRandomQuestion(randomUser, randomSubject);
const randomAnswer = generateRandomAnswer(randomUserTwo, randomQuestion);

interface IThisProps {
    likeAuthor?: User,
    likedAnswer?: Answer
};

/**
 * @param likeAuthor => If informed the like author
 * @param likedAnswer => The answer that has been liked
 * @returns a Like instance
 */
export const generateRandomLike = ({ likeAuthor, likedAnswer } : IThisProps) => {
    
    const answer =  likedAnswer || randomAnswer;
    let author = likeAuthor || randomUserThree;

    return Like.create({
        author,
        answer,
    });
};
