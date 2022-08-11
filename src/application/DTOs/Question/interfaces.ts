import { IQuestionProps } from "../../domain/entities/Interactions/Question"
import { ISubjectDataProps } from "../Subject/interfaces"
import { IUserDataProps } from "../User/interfaces"

interface IAuthorResponseProps {
    id: string,
    username: string
};

interface ISubjectResponseProps {
    id: string,
    name: string
};

export interface IQuestionToResponseProps extends Omit<IQuestionProps, 'author' | 'subject'>{
    id: string,
    author: IAuthorResponseProps,
    subject: ISubjectResponseProps
};

export interface IQuestionDataProps extends Omit<IQuestionProps, 'author' | 'subject'>{
    id: string,
    author_id: string,
    subject_id: string,
    author: IUserDataProps,
    subject: ISubjectDataProps
};
