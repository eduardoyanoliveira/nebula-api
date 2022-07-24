import { IAnswerRepository } from '../../../repositories/Answer/answer-repository';
import { IQuestionRepository } from '../../../repositories/Question/question-repository';
import { IFindUserByIdRepository } from '../../../repositories/User/user-repository';
import { IAnswerFactory } from '../../../../domain/factories/Answer/factory-class';
import { Result } from '../../../../core/Result';
import { Answer } from '../../../../domain/entities/Interactions/Answer';

interface ICreateAnswerRequest {
    text: string,
    user_id: string,
    question_id: string
};


export class CreateAnswerService {
    constructor(
        private FindUserByIdRepository: IFindUserByIdRepository,
        private QuestionRepository: IQuestionRepository,
        private AnswerRepository: IAnswerRepository,
        private AnswerFactory: IAnswerFactory
    ){};

    async execute( { text, user_id, question_id } : ICreateAnswerRequest) : Promise<Result<Answer>>{

        const userOrError = await this.FindUserByIdRepository.execute(user_id);

        if(userOrError.isFailure){
            return Result.fail<Answer>(userOrError.error);
        };

        const questionOrError = await this.QuestionRepository.findById(question_id);

        if(questionOrError.isFailure){
            return Result.fail<Answer>(questionOrError.error);
        };

        const answer = this.AnswerFactory.create(text, userOrError.getValue(), questionOrError.getValue());

        // Persist on database

        const responseOrError = await this.AnswerRepository.create(answer);

        if(responseOrError.isFailure){
            return Result.fail<Answer>(responseOrError.error); 
        };

        return Result.ok<Answer>(responseOrError.getValue());

    };
};