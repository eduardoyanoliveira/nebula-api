import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { partialUpdateObject } from "../../../utils/object-methods/partial-update-object";
import { IFindContentByIdRepository, IUpdateContentRepository } from "../../../repositories/Content/content-repositories";
import { IFindSubjectByIdRepository } from "../../../repositories/Subject/subject-repositories";

interface IUpdateContentRequest {
    id: string,
    description?: string,
    url?: string,
    subject_id?: string
};

export class UpdateContentService {

    constructor(
        private FindSubjectByIdRepository: IFindSubjectByIdRepository,
        private FindContentByIdRepository: IFindContentByIdRepository,
        private UpdateContentRepository: IUpdateContentRepository
    ){};

    async execute({ id, description, url, subject_id } : IUpdateContentRequest) : Promise<Result<Content>>{

        const contentOrError = await this.FindContentByIdRepository.execute(id);

        if(contentOrError.isFailure){
            return Result.fail<Content>(contentOrError.error);
        };

        const validatedSubjectId = subject_id || contentOrError.getValue().props.subject.id;

        const subjectOrError = await this.FindSubjectByIdRepository.execute(validatedSubjectId);

        if(subjectOrError.isFailure){
            return Result.fail<Content>(subjectOrError.error);
        };

        const updateData = {
            description,
            url,
            subject: subjectOrError.getValue(),
            updated_at: new Date()
        };

        const updatedContent = Content.create(
            { ...partialUpdateObject(contentOrError.getValue().props, updateData) },
            contentOrError.getValue().id
        );

        // Persist on database

        const response = await  this.UpdateContentRepository.execute(updatedContent);

        if(response.isFailure){
            return Result.fail<Content>(response.error);
        };

        return Result.ok<Content>(updatedContent);

    };
};