import { Answer } from "../../../domain/entities/Interactions/Answer";
import { QuestionToResponse } from '../Question/question-to-response';
import { IAnswerToResponseProps } from "./interfaces";

export interface IAnswerToResponse {
    answerToResponse(answer: Answer) : IAnswerToResponseProps
};

export class AnswerToResponse implements IAnswerToResponse{

    constructor(
        private QuestionToResponse: QuestionToResponse
    ){};
    
    answerToResponse(answer: Answer): IAnswerToResponseProps {
        const { id, props } = answer;

        const { question, author, ...rest } = props;

        const questionResponse = this.QuestionToResponse.questionToResponse(question);

        const questionProps = {
            id: questionResponse.id,
            title: questionResponse.title,
            author: questionResponse.author,
            subject: questionResponse.subject
        }

        const response = {
            id,
            ...rest,
            question: questionProps,
            author: {
                id: author.id,
                username: author.props.username
            }
        };

        return response;
    };   
};