import { IRankProps } from "../../domain/entities/Rank";
import { ISubjectDataProps } from "../Subject/interfaces";
import { IUserDataProps } from "../User/interfaces";

export interface IRankDataProps extends Omit<IRankProps, 'user' | 'subject'>{
    user_id: string,
    subject_id: string,
    user: IUserDataProps,
    subject: ISubjectDataProps
};

export interface IRankResponseProps  {
    user_id: string,
    username: string,
    subject_id: string,
    subject_name: string,
    points: number
};