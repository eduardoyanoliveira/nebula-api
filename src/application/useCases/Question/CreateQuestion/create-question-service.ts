import { IFindUserByIdRepository } from '../../../repositories/User/user-repository';
import { ISubjectRepository } from '../../../repositories/Subject/subject-repository';
import { IQuestionRepository } from '../../../repositories/Question/question-repository';
import { Result } from '../../../../core/Result';
import { Question } from '../../../../domain/entities/Interactions/Question';
import { QuestionFactory } from '../../../../domain/factories/Question/factory-class';


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
        private SubjectRepository: ISubjectRepository,
        private QuestionRepository: IQuestionRepository,
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

        const subjectOrError = await this.SubjectRepository.findById(subject_id);

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

        const responseOrError : Result<Question> = await this.QuestionRepository.create(question);

        if(responseOrError.isFailure){
            return Result.fail<Question>(responseOrError.error);
        };

        return Result.ok<Question>(responseOrError.getValue());
    };
};