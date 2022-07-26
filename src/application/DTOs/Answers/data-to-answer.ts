import { Answer } from "../../../domain/entities/Interactions/Answer";
import { DataToQuestion } from "../Question/data-to-question";
import { DataToUser } from '../User/data-to-user';
import { IAnswerDataProps } from "./interfaces";


export interface IDataToAnswer {
    dataToAnswer(answerData: IAnswerDataProps): Answer
};

export class DataToAnswer implements IDataToAnswer{

    constructor(
        private DataToUser: DataToUser,
        private DataToQuestion: DataToQuestion
    ){};
    
    dataToAnswer(answerData: IAnswerDataProps): Answer {
        const { id, author_id, author, question_id, question, ...props } = answerData;

        const answerAuthor = this.DataToUser.transform(author);
        const answerQuestion = this.DataToQuestion.transform(question);

        const answerProps = {
            ...props,
            author: answerAuthor,
            question: answerQuestion
        };

        const answer = Answer.create(answerProps, id);

        return answer;
    };
};