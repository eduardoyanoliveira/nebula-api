import { IQuestionToReponse, QuestionToResponse } from "./question-to-response";
import { DataToQuestion, IDataToQuestion } from './data-to-question';

export interface IQuestionDTO extends IQuestionToReponse, IDataToQuestion {};

export class QuestionDTO implements IQuestionDTO{

    public questionToResponse;
    public dataToQuestion;

    constructor(

    ){
        this.dataToQuestion = new DataToQuestion().dataToQuestion;
        this.questionToResponse = new QuestionToResponse().questionToResponse;
    };
};
