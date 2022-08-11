import { BaseInteraction, IInteractionProps } from './BaseInteraction';
import { Question } from './Question';

export interface IAnswerProps extends IInteractionProps {
    question: Question,
};


/**
 * An answer of any subject
 * @method create Static method that creates a new instance of Answer
 * @param text  A text that with the answer for the question
 * @param question The question beeing answered
 * @param author The answer's author (user)
 */
export class Answer extends BaseInteraction<IAnswerProps>{

    private constructor(props : IAnswerProps, id?: string){
        super(props, id)
    };

    static create(props, id?: string){
        const answer =  new Answer(
            {
                ...props,
                created_at: props.created_at ?? new Date(),
                updated_at: props.updated_at ?? new Date()
            },
            id
        );

        return answer;
    };
};