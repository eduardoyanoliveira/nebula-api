import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { IFindQuestionByIdRepository } from "../../../repositories/Question/question-repositories";


interface IGetQuestionRequest {
    question_id: string
};

export class GetQuestionService {
    constructor(
        private FindQuestionByIdRepository: IFindQuestionByIdRepository
    ){};

    async execute({ question_id } : IGetQuestionRequest ) : Promise<Result<Question>>{

        const questionOrError = await this.FindQuestionByIdRepository.execute(question_id);

        if(questionOrError.isFailure){
            return Result.fail<Question>(questionOrError.error);
        };

        return Result.ok<Question>(questionOrError.getValue());
    };
};