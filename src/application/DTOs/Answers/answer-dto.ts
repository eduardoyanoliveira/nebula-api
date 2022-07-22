import { DataToQuestion } from "../Question/data-to-question";
import { QuestionToResponse } from "../Question/question-to-response";
import { DataToUser } from "../User/data-to-user";
import { AnswerToResponse, IAnswerToResponse } from "./answer-to-response";
import { DataToAnswer, IDataToAnswer } from "./data-to-answer";

export interface IAnswerDTO extends IDataToAnswer, IAnswerToResponse{};

export class AnswerDTO implements IAnswerDTO{

    public dataToAnswer;
    public answerToResponse;

    constructor(
        private DataToUser: DataToUser,
        private DataToQuestion: DataToQuestion,
        private QuestionToResponse: QuestionToResponse
    ){
        this.dataToAnswer = new DataToAnswer(this.DataToUser, this.DataToQuestion).dataToAnswer,
        this.answerToResponse = new AnswerToResponse(this.QuestionToResponse).answerToResponse
    };   
};

const dataToUser = new DataToUser();
const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();

const answerDTO = new AnswerDTO(dataToUser, dataToQuestion, questionToResponse);

export { answerDTO };