import { IAnswerRepository } from '../../../application/repositories/Answer/answer-repository';
import { Result } from '../../../core/Result';
import { Answer } from '../../../domain/entities/Interactions/Answer';

export class InMemoryAnswerRepository implements IAnswerRepository{


    public answers : Answer[] = []

    async create(answer: Answer): Promise<Result<Answer>> {
        
        this.answers.push(answer);

        return Result.ok<Answer>(answer);
    };

    async update(answer: Answer): Promise<Result<Answer>> {

        const index = this.answers.findIndex(item => item.id === answer.id);

        this.answers[index] = answer;

        return Result.ok<Answer>(answer);
    };

    async findById(answer_id: string): Promise<Result<Answer>> {
        const answer = this.answers.find(item => item.id === answer_id);

        if(!answer){
            return Result.fail<Answer>('Could not find the answer by the given id');
        };

        return Result.ok<Answer>(answer);
    };

    async list(): Promise<Result<Answer[]>> {
        return Result.ok<Answer[]>(this.answers);
    };;

}