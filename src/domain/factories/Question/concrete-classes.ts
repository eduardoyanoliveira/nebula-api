import { IQuestionProps, Question } from "../../entities/Interactions/Question";
import { Subject } from "../../entities/Subject";
import { User } from "../../entities/User";

export class BaseQuestion implements IQuestionProps {

    title: string;
    text: string;
    is_public: boolean;
    is_closed: boolean;
    author: User;
    subject: Subject;
    created_at: Date;
    updated_at: Date;


    private constructor(title: string, text: string, is_public: boolean, user: User, subject: Subject){
        this.title = title;
        this.text = text;
        this.author = user;
        this.subject = subject;
        this.is_public = is_public;
        this.is_closed = false;
        this.created_at = new Date();
        this.updated_at = new Date()
    };

    static create(title: string, text: string, is_public: boolean ,user: User, subject: Subject){
        const baseQuestion = new BaseQuestion(title, text, is_public, user, subject);
        return Question.create(baseQuestion);
    };
};


