import { Like } from "../../domain/entities/Interactions/Like";
import { ILikeToResponseProps } from "./interfaces";


export interface ILikeToReponse {
    transform(like: Like) : ILikeToResponseProps
};

export class LikeToResponse implements ILikeToReponse {
    transform(like: Like): ILikeToResponseProps {

        const { author, answer, created_at } = like.props;

        return {
            authorId: author.id,
            answerId: answer.id,
            createdAt: created_at as Date
        };

    };
};