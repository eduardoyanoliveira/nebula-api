import { Result } from "../../../../core/Result";
import { Subject } from "../../../../domain/entities/Subject";
import { partialUpdateObject } from "../../../../utils/object-methods/partial-update-object";
import { ISubjectRepository } from "../../../repositories/Subject/subject-repository";

interface IUpdateSubjectRequest {
    id: string;
    name?: string,
    is_active?: boolean
};

export class UpdateSubjectService {
    constructor(
        private SubjectRepository: ISubjectRepository,
    ){};

    async execute({ id, name, is_active }: IUpdateSubjectRequest) : Promise<Result<Subject>>{
        
        const updateData = {
            name,
            is_active,
            updated_at: new Date()
        };
        
        const subjectOrError = await this.SubjectRepository.findById(id);
        
        if(subjectOrError.isFailure){
            return Result.fail<Subject>(subjectOrError.error)
        };

        const updatedSubject = Subject.create(
            { ...partialUpdateObject(subjectOrError.getValue().props, updateData) },
            subjectOrError.getValue().id
        );
        
        // Persist on database
        await this.SubjectRepository.update(updatedSubject); 
        
        return Result.ok<Subject>(updatedSubject);
    };
};