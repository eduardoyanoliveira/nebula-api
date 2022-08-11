import { Question } from "../../entities/Interactions/Question";
import { Subject } from "../../entities/Subject";
import { User } from "../../entities/User";
import { BaseQuestion } from "./concrete-classes";

export interface IQuestionFactory {
    create(title: string, text: string, is_public: boolean, user: User, subject: Subject): Question,
};


export class QuestionFactory implements IQuestionFactory {
    
    create( title: string, text: string, is_public: boolean, user: User, subject: Subject) : Question {
        return BaseQuestion.create(title, text, is_public, user, subject);
    };
};