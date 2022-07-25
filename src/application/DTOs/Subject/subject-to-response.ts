import { Subject } from "../../../domain/entities/Subject";
import { ISubjectDataProps } from "./interfaces";

export interface ISubjectToResponse {
    transform(subject: Subject) : ISubjectDataProps
};

export class SubjectToResponse implements ISubjectToResponse {
    transform(subject: Subject) : ISubjectDataProps {

        const { id, props } = subject;

        return {
            id,
            ...props
        };
    };
};