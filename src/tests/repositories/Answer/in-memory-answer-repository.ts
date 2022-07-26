import { ICreateAnswerRepository, IFindAnswerByIdRepository, IListAnswersRepository, IUpdateAnswerRepository } from '../../../application/repositories/Answer/answer-repositories';
import { Result } from '../../../core/Result';
import { Answer } from '../../../domain/entities/Interactions/Answer';


export const inMemoryAnswers : Answer[] = [];

export class InMemoryCreateAnswerRepository implements ICreateAnswerRepository{
  
    async execute(answer: Answer): Promise<Result<Answer>> {
        
        inMemoryAnswers.push(answer);

        return Result.ok<Answer>(answer);
    };
    
};

export class InMemoryUpdateAnswerRepository implements IUpdateAnswerRepository{

    async execute(answer: Answer): Promise<Result<Answer>> {

        const index = inMemoryAnswers.findIndex(item => item.id === answer.id);

        inMemoryAnswers[index] = answer;

        return Result.ok<Answer>(answer);
    };
};

export class InMemoryFindAnswerByIdRepository implements IFindAnswerByIdRepository{
    async execute(answer_id: string): Promise<Result<Answer>> {
        const answer = inMemoryAnswers.find(item => item.id === answer_id);

        if(!answer){
            return Result.fail<Answer>('Could not find the answer by the given id');
        };

        return Result.ok<Answer>(answer);
    };
};
export class InMemoryListAnswersRepository implements IListAnswersRepository{

    async execute(): Promise<Result<Answer[]>> {
        return Result.ok<Answer[]>(inMemoryAnswers);
    };
};