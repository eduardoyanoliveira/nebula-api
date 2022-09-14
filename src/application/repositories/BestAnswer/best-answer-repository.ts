import { Result } from '../../core/Result';
import { BestAnswer } from '../../domain/entities/Interactions/BestAnswer';
import { User } from '../../domain/entities/User';

export interface ICreateBestAnswerRepository {
    execute(bestAnswer: BestAnswer): Promise<Result<BestAnswer>>,
};

export interface IListBestAnswerByAuthorRepository {
    execute(author: User): Promise<Result<BestAnswer[]>>,
};

export interface IFindBestAnswerByQuestionRepository {
    execute(questionId: string) : Promise<Result<BestAnswer>>
};

export interface IRemoveBestAnswerByQuestionRepository {
    execute(questionId: string) : Promise<Result<BestAnswer>>
};

