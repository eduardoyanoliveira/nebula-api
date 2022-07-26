import { Question } from "../../domain/entities/Interactions/Question";
import { Subject } from "../../domain/entities/Subject";
import { Role, User } from "../../domain/entities/User";
import { IQuestionDataProps } from "./interfaces";

export interface IDataToQuestion {
    transform(questionData: IQuestionDataProps): Question,
};

export class DataToQuestion implements IDataToQuestion {

    transform(questionData: IQuestionDataProps) : Question{

        const { id, author, author_id, subject, subject_id, best_answers, ...rest } = questionData;
    
        const { id: authorId, ...authorProps } = author;
    
        const newAuthorProps  = {
            ...authorProps,
            role: Role[authorProps.role]
        };
    
        const newAuthor = User.create(newAuthorProps, authorId);
    
        const { id: subjectId, ...subjectProps } = subject;
        
        const newSubject = Subject.create(subjectProps, subjectId);
    
    
        const props = {
            ...rest,
            author: newAuthor,
            subject: newSubject,
            bestAnswers: best_answers
        };
    
        return Question.create(props, id);
    
    };

};
