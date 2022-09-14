import { Entity } from '../../../core/domain/Entity';
import { Answer } from './Answer';
import { Question } from './Question';

export interface IBestAnswerProps {
    answer: Answer,
    question: Question,
    created_at?: Date,
};

/**
 * A table row that represents the best answer for a question
 * @param answer: The best answer
 * @param question: The question
 */
export class BestAnswer extends Entity<IBestAnswerProps>{

    private constructor(props : IBestAnswerProps, id?: string){
        super(props, id);
    };

    static create(props, id?: string){
        const bestAnswer =  new BestAnswer(
            {
                ...props,
                created_at: props.created_at ?? new Date()
            },
            id
        );

        return bestAnswer;
    };
};