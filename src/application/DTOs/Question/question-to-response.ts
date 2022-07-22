import { Question } from "../../../domain/entities/Interactions/Question"
import { IQuestionToResponseProps } from "./interfaces";



export interface IQuestionToReponse {
    questionToResponse(question: Question) :IQuestionToResponseProps
};


export class QuestionToResponse implements IQuestionToReponse {

    questionToResponse(question: Question) : IQuestionToResponseProps {

        const { id, props } = question;
        const { author, subject, ...rest } = props;

        const formatedAuthor = {
            id: author.id,
            username: author.props.username
        };

        const formatedSubject = {
            id: subject.id,
            name: subject.props.name
        };

        const  questionResponse : IQuestionToResponseProps = {

            id,
            ...rest,
            author: formatedAuthor,
            subject: formatedSubject
        };

        return questionResponse;
    };
};