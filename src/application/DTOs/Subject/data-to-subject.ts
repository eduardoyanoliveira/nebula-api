import { Subject } from "../../../domain/entities/Subject";
import { ISubjectDataProps } from "./interfaces";

export interface IDataToSubject {
    transform(subjectData: ISubjectDataProps): Subject;
};

export class DataToSubject implements IDataToSubject {

    transform(subjectData : ISubjectDataProps): Subject {
        const { id, ...props } = subjectData;
    
        return Subject.create(props, id);
    };
};
