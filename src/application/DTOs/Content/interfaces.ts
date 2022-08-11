import { IContentProps } from "../../domain/entities/Content";
import { ISubjectDataProps } from '../Subject/interfaces';

export interface IContentResponseProps extends Omit<IContentProps, 'subject'> {
    id: string,
    subject: ISubjectDataProps
};

export interface IContentDataProps extends IContentResponseProps{
    subject_id: string,
};