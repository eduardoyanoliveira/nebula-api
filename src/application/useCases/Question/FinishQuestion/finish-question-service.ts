import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { IQuestionRepository } from "../../../repositories/Question/question-repository";

interface IFinishQuestionRequest {
    id: string,
    user_id: string,
    is_closed: boolean
};

export class FinishQuestionService {
    constructor(
        private QuestionRepository: IQuestionRepository
    ){};

    async execute({ id, user_id, is_closed } : IFinishQuestionRequest) : Promise<Result<Question>>{
        
        const questionOrError = await this.QuestionRepository.findById(id);

        if(questionOrError.isFailure){
            return Result.fail<Question>(questionOrError.error);
        };

        if(questionOrError.getValue().props.author.id !== user_id){
            return Result.fail<Question>('Only the users who has created the question can update it');
        };


        const question = questionOrError.getValue();

        question.props.is_closed = is_closed;

        // Persist on database

        const databaseResponse = await this.QuestionRepository.update(question);

        if(databaseResponse.isFailure){
            return Result.fail<Question>(databaseResponse.error);
        };

        return Result.ok<Question>(databaseResponse.getValue());
    };
};