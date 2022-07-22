import { Subject } from "../../../domain/entities/Subject";
import { ISubjectDataProps } from "./interfaces";

export interface IDataToSubject {
    dataToSubject(subjectData: ISubjectDataProps): Subject;
};

export class DataToSubject implements IDataToSubject {

    dataToSubject(subjectData : ISubjectDataProps): Subject {
        const { id, ...props } = subjectData;
    
        return Subject.create(props, id);
    };
};
