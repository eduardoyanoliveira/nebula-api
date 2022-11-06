import { Result } from "../../../core/Result";
import { Answer } from "../../../domain/entities/Interactions/Answer";
import { Like } from "../../../domain/entities/Interactions/Like";
import { User } from "../../../domain/entities/User";
import { 
    ICreateLikeRepository, 
    IFindLikeByAuthorAndAnswerRepository, 
    IRemoveLikeRepository, 
    ICountLikesByAnswerRepository 
} from "../../../repositories/Like/like-repositories";

export const inMemoryLikes : Like[] = [];

export class InMemoryCreateLikeRepository implements ICreateLikeRepository{
  
    async execute(like: Like): Promise<Result<Like>> {
        
        inMemoryLikes.push(like);

        return Result.ok<Like>(like);
    };
    
};

export class InMemoryFindLikeByAuthorAndAnswerRepository implements IFindLikeByAuthorAndAnswerRepository{
    async execute(author: User, answer: Answer): Promise<Result<Like>> {
        
        const like = inMemoryLikes.find(
            like => like.props.author.id === author.id 
            && like.props.answer.id === answer.id
        );

        if(!like) return Result.fail<Like>("No like with this author to this answer was found on database");

        return Result.ok<Like>(like);
        
    };
};

export class InMemoryRemoveLikeRepository implements IRemoveLikeRepository {
    
    async execute(like: Like): Promise<Result<string>> {
        
        const index = inMemoryLikes.findIndex(
            item => item.id === like.id
        );

        if(index < 0) return Result.fail<string>("No like with this author to this answer was found on database");

        inMemoryLikes.splice(index, 1);

        return Result.ok<string>("Like successfuly remove from database");
    };
};

export class InMemoryCountLikesByAnswerRepository implements ICountLikesByAnswerRepository {

    async execute(answer: Answer): Promise<Result<number>> {
        const likes: Like[] = inMemoryLikes.filter(like => like.props.answer.id === answer.id);

        return Result.ok<number>(likes.length);
    };
};