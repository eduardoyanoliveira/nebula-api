import { ICreateQuestionRepository, IFindQuestionByIdRepository, IListQuestionsRepository, IUpdateQuestionRepository } from "../../../repositories/Question/question-repositories";
import { Result } from "../../../core/Result";
import { Question } from "../../../domain/entities/Interactions/Question";

export const inMemoryQuestions : Question[] = [];

export class InMemoryCreateQuestionRepository implements ICreateQuestionRepository{
    async execute(question: Question): Promise<Result<Question>> {
        inMemoryQuestions.push(question);

        return Result.ok<Question>(question);
    };
};

export class InMemoryUpdateQuestionRepository implements IUpdateQuestionRepository{

    async execute(question: Question): Promise<Result<Question>> {

        const index = inMemoryQuestions.findIndex(item => item.id === question.id);

        inMemoryQuestions[index] = question;

        return Result.ok<Question>(question);
    };
};

export class InMemoryFindQuestionByIdRepository implements IFindQuestionByIdRepository {

    async execute(question_id: string): Promise<Result<Question>> {
        
        const question = inMemoryQuestions.find(item => item.id === question_id);

        if(!question){
            return Result.fail<Question>('Could not find any question with the given id')
        };

        return Result.ok<Question>(question);
    };
};

export class InMemoryListQuestionsRepository implements IListQuestionsRepository{
    async execute(): Promise<Result<Question[]>> {
        return Result.ok<Question[]>(inMemoryQuestions);
    };
};
