import { IAnswerProps } from "../../../domain/entities/Interactions/Answer";
import { IUserDataProps } from "../User/interfaces";
import { IQuestionDataProps, IQuestionToResponseProps } from '../Question/interfaces';

export interface IAnswerDataProps extends Omit<IAnswerProps, 'author' | 'question'>{
    id: string,
    author_id: string,
    question_id: string,
    author: IUserDataProps,
    question: IQuestionDataProps
};

interface IAuthorProps {
    id: string,
    username: string
};


interface IAnswerQuestion extends Pick<IQuestionToResponseProps, 'author' | 'subject'>{
    id: string,
    title: string,
};

export interface IAnswerToResponseProps extends Omit<IAnswerProps, 'author' | 'question'>{
    id: string,
    author: IAuthorProps,
    question: IAnswerQuestion
}