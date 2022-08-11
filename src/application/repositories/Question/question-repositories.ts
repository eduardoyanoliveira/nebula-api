import { Question } from "../../domain/entities/Interactions/Question";
import { Result } from '../../core/Result';

export interface ICreateQuestionRepository{
    execute(question: Question): Promise<Result<Question>>,
};

export interface IUpdateQuestionRepository{
    execute(question: Question): Promise<Result<Question>>,
};

export interface IFindQuestionByIdRepository{
    execute(question_id: string): Promise<Result<Question>>,
};

export interface IListQuestionsRepository{
    execute(filters?: object): Promise<Result<Question[]>>,
};