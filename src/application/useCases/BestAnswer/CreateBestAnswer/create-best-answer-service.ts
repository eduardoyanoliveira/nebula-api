import { Result } from "../../../core/Result";
import { BestAnswer } from "../../../domain/entities/Interactions/BestAnswer";
import { IFindAnswerByIdRepository } from "../../../repositories/Answer/answer-repositories";
import { ICreateBestAnswerRepository } from "../../../repositories/BestAnswer/best-answer-repository";
import { IFindQuestionByIdRepository } from "../../../repositories/Question/question-repositories";

interface IBestAnswerRequest {
    answer_id: string,
    question_id: string
};

export class CreateBestAnswerService {

    constructor(
        private FindQuestionById: IFindQuestionByIdRepository,
        private FindAnswerById: IFindAnswerByIdRepository,
        private CreateBestAnswerRepository: ICreateBestAnswerRepository
    ){};
    
    async execute({ answer_id, question_id } : IBestAnswerRequest): Promise<Result<BestAnswer>> {
        
        const questionResponse = await this.FindQuestionById.execute(question_id);

        if(questionResponse.isFailure){
            return Result.fail(questionResponse.error);
        };
        
        const answerResponse = await this.FindAnswerById.execute(answer_id);

        if(answerResponse.isFailure){
            return Result.fail(answerResponse.error);
        };

        if(answerResponse.getValue().props.question.id !== questionResponse.getValue().id){
            return Result.fail('Only answers linked with the question can be selected as the best answer');
        };

        const bestAnswer = BestAnswer.create({
            answer: answerResponse.getValue(), 
            question: questionResponse.getValue()
        });

        // Persist on Database

        const response = await this.CreateBestAnswerRepository.execute(bestAnswer);

        if( response.isFailure ){
            return Result.fail(response.error);
        };

        return Result.ok(response.getValue());
    };
};