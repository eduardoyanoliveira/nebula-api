import { IQuestionRepository } from "../../../application/repositories/Question/question-repository";
import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";

export class InMemoryQuestionRepository implements IQuestionRepository{


    public questions : Question[] = [];

    async create(question: Question): Promise<Result<Question>> {
        this.questions.push(question);

        return Result.ok<Question>(question);
    };

    async update(question: Question): Promise<Result<Question>> {

        const index = this.questions.findIndex(item => item.id === question.id);

        this.questions[index] = question;

        return Result.ok<Question>(question);
    };

    async findById(question_id: string): Promise<Result<Question>> {
        
        const question = this.questions.find(item => item.id === question_id);

        if(!question){
            return Result.fail<Question>('Could not find any question with the given id')
        };

        return Result.ok<Question>(question);
    };

    async list(): Promise<Result<Question[]>> {
        return Result.ok<Question[]>(this.questions);
    };
};