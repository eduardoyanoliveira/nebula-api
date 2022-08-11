import { ICreateContentRepository, IFindContentByIdRepository, IListContentsRepository, IUpdateContentRepository } from '../../../repositories/Content/content-repositories';
import { Result } from '../../../core/Result';
import { Content } from '../../../domain/entities/Content';

export  const inMemoryContents : Content[] = [];
export class InMemoryCreateContentRepository implements ICreateContentRepository{
    async execute(content: Content): Promise<Result<Content>> {
        
        inMemoryContents.push(content);

        return Result.ok<Content>(content);
    };

};

export class InMemoryUpdateContentRepository implements IUpdateContentRepository{
  
    async execute(content: Content): Promise<Result<Content>> {
        const index = inMemoryContents.findIndex(item => item.id === content.id);

        inMemoryContents[index] = content;

        return Result.ok<Content>(content);
    };   
};


export class InMemoryFindContentByIdRepository implements IFindContentByIdRepository{

    async execute(content_id: string): Promise<Result<Content>> {
        
        const content = await inMemoryContents.find(item => item.id === content_id);

        if(!content){
            return Result.fail<Content>('Could not find a content with the ginen id');
        };

        return Result.ok<Content>(content);
    };
};

export class InMemoryListContentsRepository implements IListContentsRepository{
    async execute(): Promise<Result<Content[]>> {
        return Result.ok<Content[]>(inMemoryContents);
    };
};
