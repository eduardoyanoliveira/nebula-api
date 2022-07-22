import { Result } from "../../../../core/Result";
import { Rankmark } from "../../../../domain/entities/Rankmark";
import { RankmarkFactory } from '../../../../domain/factories/Rankmark/factory-class';
import { IRankmarkRepository } from "../../../repositories/Rankmark/rankmark-repository";

interface ICreateRankmarkRequestProps {
    name: string,
    color: string,
    points: number
};

export class CreateRankmarkService {

    constructor(
        private RankmarkFactory: RankmarkFactory,
        private RankmarkRepository: IRankmarkRepository
    ){};

    async execute({ name, color, points } : ICreateRankmarkRequestProps) : Promise<Result<Rankmark>>{

        const alreadyExists = await this.RankmarkRepository.findByName(name);
        
        if(alreadyExists.isSuccess){
            return Result.fail<Rankmark>('There is already a rankmark on database with this name');
        };

        const rankmark = await this.RankmarkFactory.create(name, color, points);

        const rankmarkOrError = await this.RankmarkRepository.create(rankmark);

        if(rankmarkOrError.isFailure){
            return Result.fail<Rankmark>(rankmarkOrError.error);
        };

        return Result.ok<Rankmark>(rankmarkOrError.getValue());

    };  
};