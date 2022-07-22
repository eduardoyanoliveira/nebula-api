import { IContentRepository } from '../../../application/repositories/Content/content-repository';
import { Result } from '../../../core/Result';
import { Content } from '../../../domain/entities/Content';


export class InMemoryContentRepository implements IContentRepository{

    public  contents : Content[] = []

    async create(content: Content): Promise<Result<Content>> {
        
        this.contents.push(content);

        return Result.ok<Content>(content);
    };

    async update(content: Content): Promise<Result<Content>> {
        const index = this.contents.findIndex(item => item.id === content.id);

        this.contents[index] = content;

        return Result.ok<Content>(content);
    };

    async findById(content_id: string): Promise<Result<Content>> {
        
        const content = await this.contents.find(item => item.id === content_id);

        if(!content){
            return Result.fail<Content>('Could not find a content with the ginen id');
        };

        return Result.ok<Content>(content);
    };
    
    async list(): Promise<Result<Content[]>> {
        return Result.ok<Content[]>(this.contents);
    };

};