import { Question } from "../../../domain/entities/Interactions/Question";
import { Result } from '../../../core/Result';

export interface IQuestionRepository {
    create(question: Question): Promise<Result<Question>>,
    update(question: Question): Promise<Result<Question>>,
    findById(question_id: string): Promise<Result<Question>>,
    list(filters?: object): Promise<Result<Question[]>>,
};