import { Result } from "../../../../core/Result";
import { Question } from "../../../../domain/entities/Interactions/Question";
import { partialUpdateObject } from "../../../../utils/object-methods/partial-update-object";
import { IQuestionRepository } from "../../../repositories/Question/question-repository";
import { ISubjectRepository } from "../../../repositories/Subject/subject-repository";


interface IUpdateQuestionRequest {
    id: string,
    user_id: string,
    title?: string,
    text?: string,
    subject_id?: string
};


export class UpdateQuestionService {
    constructor(
        private Questionrepository: IQuestionRepository,
        private SubjectRepository: ISubjectRepository,
    ){};

    async execute({ id, user_id, title, text, subject_id } : IUpdateQuestionRequest){

        const questionOrError = await this.Questionrepository.findById(id);

        if(questionOrError.isFailure){
            return Result.fail<Question>(questionOrError.error);
        };

        if(questionOrError.getValue().props.author.id !== user_id){
            return Result.fail<Question>('Only the users who has created the question can update it');
        };

        const validatedSubjectId = subject_id || questionOrError.getValue().props.subject.id;

        const subjectOrError = await this.SubjectRepository.findById(validatedSubjectId);

        if(subjectOrError.isFailure){
            return Result.fail<Question>(subjectOrError.error); 
        };

        const updateData = {
            title,
            text,
            subject: subjectOrError.getValue(),
            updated_at: new Date()
        };

        const updatedContent = Question.create(
            { ...partialUpdateObject(questionOrError.getValue().props, updateData) },
            questionOrError.getValue().id
        );

        // Persist on database

        const response = await this.Questionrepository.update(updatedContent);

        if(response.isFailure){
            return Result.fail<Question>(response.error); 
        };

        return Result.ok<Question>(updatedContent);
    };
};