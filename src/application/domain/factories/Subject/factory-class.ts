import { Subject } from "../../entities/Subject";
import { BaseSubject } from "./concrete-classes";

export interface ISubjectFactory {
    create(name: string) : Subject,
};

export class SubjectFactory implements ISubjectFactory{

    create(name: string): Subject {
        return BaseSubject.create(name);
    };
};