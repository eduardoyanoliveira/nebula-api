import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { IQuestionRepository } from "../../../repositories/Question/question-repository";

interface IChangeQuestionAccessRequest {
    id: string,
    user_id: string,
    is_public: boolean
};

export class ChangeQuestionAccessSerivce {
    constructor(
        private QuestionRepository: IQuestionRepository
    ){};

    async execute({ id, user_id, is_public } : IChangeQuestionAccessRequest) : Promise<Result<Question>>{
        
        const questionOrError = await this.QuestionRepository.findById(id);

        if(questionOrError.isFailure){
            return Result.fail<Question>(questionOrError.error);
        };

        
        if(questionOrError.getValue().props.author.id !== user_id){
            return Result.fail<Question>('Only the users who has created the question can update it');
        };


        const question = questionOrError.getValue();

        question.props.is_public = is_public;

        // Persist on database

        const databaseResponse = await this.QuestionRepository.update(question);

        if(databaseResponse.isFailure){
            return Result.fail<Question>(databaseResponse.error);
        };

        return Result.ok<Question>(databaseResponse.getValue());
    };
};