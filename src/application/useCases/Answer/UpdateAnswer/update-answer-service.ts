import { Result } from "../../../../core/Result";
import { Answer } from "../../../../domain/entities/Interactions/Answer";
import { IAnswerRepository } from "../../../repositories/Answer/answer-repository";


interface IUpdateAnswerRequest {
    answer_id: string,
    user_id: string,
    text: string
};

export class UpdateAnswerService {

    constructor(
        private AnswerRepository: IAnswerRepository
    ){};

    async execute({ answer_id, user_id, text } : IUpdateAnswerRequest) : Promise<Result<Answer>>{

        const answerOrError = await this.AnswerRepository.findById(answer_id);

        if(answerOrError.isFailure){
            return Result.fail<Answer>(answerOrError.error);
        };

        const answer = answerOrError.getValue();

        if(answer.props.author.id !== user_id){
            return Result.fail<Answer>('Only the user author of the answer can update it');
        };

        answer.props.text = text;
        answer.props.updated_at = new Date();

        // Persist on database

        const responseOrError = await this.AnswerRepository.update(answer);

        if(responseOrError.isFailure){
            return Result.fail<Answer>(responseOrError.error);
        };

        return Result.ok<Answer>(responseOrError.getValue());
    };
};