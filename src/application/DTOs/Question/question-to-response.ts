import { Question } from "../../domain/entities/Interactions/Question"
import { IQuestionToResponseProps } from "./interfaces";


export interface IQuestionToResponse {
    transform(question: Question) :IQuestionToResponseProps
};


export class QuestionToResponse implements IQuestionToResponse {

    transform(question: Question) : IQuestionToResponseProps {

        const { id, props } = question;
        const { author, subject, bestAnswers, ...rest } = props;

        const formatedAuthor = {
            id: author.id,
            username: author.props.username,
            photo: author.props.photo
        };

        const formatedSubject = {
            id: subject.id,
            name: subject.props.name
        };

        const  questionResponse : IQuestionToResponseProps = {
            id,
            ...rest,
            author: formatedAuthor,
            subject: formatedSubject,
            bestAnswers: bestAnswers
        };

        return questionResponse;
    };
};