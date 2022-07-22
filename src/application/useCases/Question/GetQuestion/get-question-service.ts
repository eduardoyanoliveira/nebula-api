import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { IQuestionRepository } from "../../../repositories/Question/question-repository";


interface IGetQuestionRequest {
    question_id: string
};

export class GetQuestionService {
    constructor(
        private QuestionRepository: IQuestionRepository
    ){};

    async execute({ question_id } : IGetQuestionRequest ) : Promise<Result<Question>>{

        const questionOrError = await this.QuestionRepository.findById(question_id);

        if(questionOrError.isFailure){
            return Result.fail<Question>(questionOrError.error);
        };

        return Result.ok<Question>(questionOrError.getValue());
    };
};