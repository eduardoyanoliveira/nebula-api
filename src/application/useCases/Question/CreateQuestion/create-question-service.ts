import { IFindUserByIdRepository } from '../../../repositories/User/user-repositories';
import { ICreateQuestionRepository } from '../../../repositories/Question/question-repositories';
import { Result } from '../../../core/Result';
import { Question } from '../../../domain/entities/Interactions/Question';
import { QuestionFactory } from '../../../domain/factories/Question/factory-class';
import { IFindSubjectByIdRepository } from '../../../repositories/Subject/subject-repositories';


interface ICreateQuestionRequest {
    title: string,
    text: string,
    is_public: boolean,
    author_id: string,
    subject_id: string 
};


export class CreateQuestionService {

    constructor(
        private QuestionFactory: QuestionFactory,
        private FindUserByIdRepository : IFindUserByIdRepository,
        private FindSubjectByIdRepository: IFindSubjectByIdRepository,
        private CreateQuestionRepository: ICreateQuestionRepository,
    ){};

    async execute({ 
        title,
        text,
        is_public, 
        author_id, 
        subject_id 
    } : ICreateQuestionRequest ) : Promise<Result<Question>> {

        const userOrError = await this.FindUserByIdRepository.execute(author_id);

        if(userOrError.isFailure){
            return Result.fail<Question>(userOrError.error);
        };

        const subjectOrError = await this.FindSubjectByIdRepository.execute(subject_id);

        if(subjectOrError.isFailure){
            return Result.fail<Question>(subjectOrError.error);
        };

        const question : Question = this.QuestionFactory.create(
            title,
            text,
            is_public,
            userOrError.getValue(),
            subjectOrError.getValue()
        );

        // Persist on database

        const responseOrError : Result<Question> = await this.CreateQuestionRepository.execute(question);

        if(responseOrError.isFailure){
            return Result.fail<Question>(responseOrError.error);
        };

        return Result.ok<Question>(responseOrError.getValue());
    };
};