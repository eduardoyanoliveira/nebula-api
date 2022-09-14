import { Result } from '../../../core/Result';
import { BestAnswer } from '../../../domain/entities/Interactions/BestAnswer';
import { User } from '../../../domain/entities/User';
import { ICreateBestAnswerRepository, IFindBestAnswerByQuestionRepository, IListBestAnswerByAuthorRepository, IRemoveBestAnswerByQuestionRepository } from '../../../repositories/BestAnswer/best-answer-repository';


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

export class InMemoryFindBestAnswerByQuestionRepository implements IFindBestAnswerByQuestionRepository{

    async execute(questionId: string): Promise<Result<BestAnswer>> {
        const bestAnswer = inMemoryBestAnswers.find(answer => answer.props.question.id === questionId);

        if(!bestAnswer){
            return Result.fail('Best Answer was not Found');
        };

        return Result.ok(bestAnswer);
    };
};

export class InMemoryRemoveBestAnswerByQuestionRepository implements IRemoveBestAnswerByQuestionRepository{

    async execute(questionId: string): Promise<Result<BestAnswer>> {

        const index = inMemoryBestAnswers.findIndex(item => item.id === questionId);
 
        if(!index){
            return Result.fail('Best Answer was not Found');
        };

        const bestAnswer = inMemoryBestAnswers[index];

        inMemoryBestAnswers.splice(index, 1);

        return Result.ok(bestAnswer);
    };
};