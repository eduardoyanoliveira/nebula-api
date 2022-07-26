import { Answer } from '../../../domain/entities/Interactions/Answer';
import { Result } from '../../../core/Result';

export interface ICreateAnswerRepository {
    execute(answer: Answer): Promise<Result<Answer>>,
};

export interface IUpdateAnswerRepository {
    execute(answer: Answer): Promise<Result<Answer>>,
};

export interface IFindAnswerByIdRepository {
    execute(answer_id: string): Promise<Result<Answer>>
};

export interface IListAnswersRepository{
    execute(filters?: object): Promise<Result<Answer[]>>,
};