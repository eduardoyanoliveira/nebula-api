import { Answer } from "../../domain/entities/Interactions/Answer";
import { QuestionToResponse } from '../Question/question-to-response';
import { IAnswerToResponseProps } from "./interfaces";

export interface IAnswerToResponse {
    transform(answer: Answer) : IAnswerToResponseProps
};

export class AnswerToResponse implements IAnswerToResponse{

    constructor(
        private QuestionToResponse: QuestionToResponse
    ){};
    
    transform(answer: Answer): IAnswerToResponseProps {
        const { id, props } = answer;

        const { question, author, ...rest } = props;

        const questionResponse = this.QuestionToResponse.transform(question);

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