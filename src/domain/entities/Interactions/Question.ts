import { Subject } from '../Subject';
import { BaseInteraction, IInteractionProps } from './BaseInteraction';

export interface IQuestionProps extends IInteractionProps {
    
    title: string,
    is_public?: boolean,
    is_closed?: boolean,
    subject: Subject,

};


/**
 * A question of any subject
 * @method create Static method that creates a new instance of question
 * @param title Question Title
 * @param text  A text that explains what is the user's doubt
 * @param is_public If true any user can see the question
 * @param is_closed If true any answers can be associated with the question
 * @param author Question author (user)
 */
export class Question extends BaseInteraction<IQuestionProps>{

    private constructor(props : IQuestionProps, id?: string){
        super(props, id)
    };

    static create(props, id?: string){
        const question =  new Question(
            {
                ...props,
                is_public: props.is_public ?? true,
                is_closed: props.is_closed ?? false,
                created_at: props.created_at ?? new Date(),
                updated_at: props.updated_at ?? new Date()
            },
            id
        );

        return question;
    };
};