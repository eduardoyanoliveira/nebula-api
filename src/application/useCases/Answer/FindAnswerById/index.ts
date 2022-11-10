import { FindAnswerByIdRepository } from "../../../database/Answer/find-answer-by-id";
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { DataToUser } from "../../../DTOs/User/data-to-user";

const dataToUser = new DataToUser();
const dataToQuestion = new DataToQuestion();

const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);

const findAnswerByIdRepository = new FindAnswerByIdRepository(dataToAnswer);

export { findAnswerByIdRepository };