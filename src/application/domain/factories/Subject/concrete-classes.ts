import { ISubjectProps, Subject } from "../../entities/Subject";

export class BaseSubject implements ISubjectProps {
    name: string;
    is_active?: boolean;
    created_at: Date;
    updated_at: Date;

    private constructor(name: string){
        this.name = name;
        this.is_active = true;
        this.created_at = new Date();
        this.updated_at = new Date();
    };

    static create(name: string) : Subject{
        const subject = Subject.create(name);
        return subject;
    };
};