import { Answer, IAnswerProps } from "../../entities/Interactions/Answer";
import { Question } from "../../entities/Interactions/Question";
import { User } from "../../entities/User";

export class BaseAnswer implements IAnswerProps {

    text: string;
    author: User;
    question: Question;
    created_at: Date;
    updated_at: Date;


    private constructor(text: string, user: User, question: Question){

        this.text = text;
        this.author = user;
        this.question = question;
        this.created_at = new Date();
        this.updated_at = new Date()
    };

    static create(text: string, user: User, question: Question){
        const baseAnswer = new BaseAnswer(text, user, question);
        return Answer.create(baseAnswer);
    };
};


