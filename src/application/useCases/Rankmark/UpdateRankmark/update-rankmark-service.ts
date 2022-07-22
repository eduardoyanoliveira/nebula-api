import { Result } from "../../../../core/Result";
import { Rankmark } from "../../../../domain/entities/Rankmark";
import { partialUpdateObject } from "../../../../utils/object-methods/partial-update-object";
import { IRankmarkRepository } from "../../../repositories/Rankmark/rankmark-repository";

interface IUpdateRankmarkRequestProps{
    id: string,
    name?: string,
    color?: string,
    points?: number,
    is_active?: boolean
};

export class UpdateRankmarkService {
    constructor(
        private RankmarkRepository : IRankmarkRepository
    ){};

    async execute({ id, name, color, points, is_active } : IUpdateRankmarkRequestProps): Promise<Result<Rankmark>>{
        
        const updateData = {
            name,
            color,
            points,
            is_active,
            updated_at: new Date()
        };

        const rankmarkOrError = await this.RankmarkRepository.findById(id);

        if(rankmarkOrError.isFailure){
            return Result.fail<Rankmark>(rankmarkOrError.error);
        };

        const rankmark = Rankmark.create(
            { ...partialUpdateObject( rankmarkOrError.getValue().props, updateData ) },
            rankmarkOrError.getValue().id
        );

        // Persist on database
        await this.RankmarkRepository.update(rankmark);

        return Result.ok<Rankmark>(rankmark);

    };
};