import { Result } from "../../core/Result";
import { Answer } from "../../domain/entities/Interactions/Answer";
import { Like } from "../../domain/entities/Interactions/Like";
import { User } from "../../domain/entities/User";

export interface ICreateLikeRepository {
    execute(like: Like): Promise<Result<Like>>,
};

export interface IFindLikeByAuthorAndAnswerRepository {
    execute(author: User, answer: Answer): Promise<Result<Like>>
};

export interface IRemoveLikeRepository {
    execute(like: Like): Promise<Result<string>>
};

export interface ICountLikesByAnswerRepository {
    execute(answer: Answer): Promise<Result<number>>
};