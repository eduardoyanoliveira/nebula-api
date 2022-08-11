import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";
import { ContentFactory } from '../../../domain/factories/Content/factory-class';
import { ICreateContentRepository } from "../../../repositories/Content/content-repositories";
import { IFindSubjectByIdRepository } from "../../../repositories/Subject/subject-repositories";
interface ICreateContentRequest {
    description: string,
    url: string,
    subject_id: string 
};

export class CreateContentService {

    constructor(
        private FindSubjectByIdRepository : IFindSubjectByIdRepository,
        private ContentFactory : ContentFactory,
        private CreateContentRepository : ICreateContentRepository,
    ){};

    async execute({ description, url, subject_id} : ICreateContentRequest) : Promise<Result<Content>>{

        const subjectOrError = await this.FindSubjectByIdRepository.execute(subject_id);

        if(subjectOrError.isFailure){
            return Result.fail<Content>(subjectOrError.error);
        };

        const content  = this.ContentFactory.create(description, url, subjectOrError.getValue());

        const contentOrError = await this.CreateContentRepository.execute(content);

        if(contentOrError.isFailure){
            return Result.fail<Content>(contentOrError.error);
        };

        return Result.ok<Content>(contentOrError.getValue());
    };
};