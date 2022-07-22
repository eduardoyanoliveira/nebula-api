import { Answer } from '../../../domain/entities/Interactions/Answer';
import { Result } from '../../../core/Result';

export interface IAnswerRepository {
    create(answer: Answer): Promise<Result<Answer>>,
    update(answer: Answer): Promise<Result<Answer>>,
    list(filters?: object): Promise<Result<Answer[]>>,
    findById(answer_id: string): Promise<Result<Answer>>
};