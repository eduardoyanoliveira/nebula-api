import { DataToSubject, IDataToSubject } from "./data-to-subject";
import { ISubjectToResponse, SubjectToResponse } from './subject-to-response';

export interface ISubjectDTO extends IDataToSubject , ISubjectToResponse{};


export class SubjectDTO implements ISubjectDTO {

    public dataToSubject;
    public subjectToResponse;

    constructor(){
        this.dataToSubject = new DataToSubject().dataToSubject;
        this.subjectToResponse = new SubjectToResponse().subjectToResponse;
    };
    
};
