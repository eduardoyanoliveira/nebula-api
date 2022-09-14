import { Result } from '../../../core/Result';
import { BestAnswer } from '../../../domain/entities/Interactions/BestAnswer';
import { User } from '../../../domain/entities/User';
import { ICreateBestAnswerRepository, IListBestAnswerByAuthorRepository } from '../../../repositories/BestAnswer/best-answer-repository';


export const inMemoryBestAnswers : BestAnswer[] = [];

export class InMemoryCreateBestAnswerRepository implements ICreateBestAnswerRepository{
  
    async execute(bestAnswer: BestAnswer): Promise<Result<BestAnswer>> {
        
        inMemoryBestAnswers.push(bestAnswer);

        return Result.ok<BestAnswer>(bestAnswer);
    };
    
};

export class InMemoryListBestAnswerByAuthorRepository implements IListBestAnswerByAuthorRepository{
  
    async execute(author: User): Promise<Result<BestAnswer[]>> {
        
        const bestAnswers = inMemoryBestAnswers.filter(answer => answer.props.answer.props.author.id === author.id);

        return Result.ok<BestAnswer[]>(bestAnswers);
    };
    
};