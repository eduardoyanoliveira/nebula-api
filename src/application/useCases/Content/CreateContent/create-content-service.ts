import { Result } from "../../../../core/Result";
import { Content } from "../../../../domain/entities/Content";
import { ContentFactory } from '../../../../domain/factories/Content/factory-class';
import { IContentRepository } from "../../../repositories/Content/content-repository";
import { ISubjectRepository } from '../../../repositories/Subject/subject-repository';

interface ICreateContentRequest {
    description: string,
    url: string,
    subject_id: string 
};

export class CreateContentService {

    constructor(
        private SubjectRepository : ISubjectRepository,
        private ContentFactory : ContentFactory,
        private ContentRepository : IContentRepository,
    ){};

    async execute({ description, url, subject_id} : ICreateContentRequest) : Promise<Result<Content>>{

        const subjectOrError = await this.SubjectRepository.findById(subject_id);

        if(subjectOrError.isFailure){
            return Result.fail<Content>(subjectOrError.error);
        };

        const content  = this.ContentFactory.create(description, url, subjectOrError.getValue());

        const contentOrError = await this.ContentRepository.create(content);

        if(contentOrError.isFailure){
            return Result.fail<Content>(contentOrError.error);
        };

        return Result.ok<Content>(contentOrError.getValue());
    };
};