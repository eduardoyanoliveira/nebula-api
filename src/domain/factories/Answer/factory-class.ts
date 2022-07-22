import { Answer } from "../../entities/Interactions/Answer";
import { Question } from "../../entities/Interactions/Question";
import { User } from "../../entities/User";
import { BaseAnswer } from "./concrete-classes";

export interface IAnswerFactory {
    create(text: string, user: User, question: Question): Answer,
};


export class AnswerFactory implements IAnswerFactory {
    
    create( text: string, user: User, question: Question) : Answer {
        return BaseAnswer.create(text, user, question);
    };
};