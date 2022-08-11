import { Result } from "../../core/Result";
import { Content } from "../../domain/entities/Content";


export interface ICreateContentRepository {
    execute(content: Content): Promise<Result<Content>>,
};

export interface IUpdateContentRepository {
    execute(content: Content): Promise<Result<Content>>,
};

export interface IFindContentByIdRepository{
    execute(content_id: string): Promise<Result<Content>>,
};

export interface IListContentsRepository{
    execute(filters?: object) : Promise<Result<Content[]>>
};
