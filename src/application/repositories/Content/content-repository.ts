import { Result } from "../../../core/Result";
import { Content } from "../../../domain/entities/Content";

export interface IContentRepository {
    create(content: Content): Promise<Result<Content>>,
    update(content: Content): Promise<Result<Content>>,
    findById(content_id: string): Promise<Result<Content>>,
    list(filters?: object) : Promise<Result<Content[]>>
};