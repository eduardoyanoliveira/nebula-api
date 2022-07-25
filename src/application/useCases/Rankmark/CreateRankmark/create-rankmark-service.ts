import { Result } from "../../../../core/Result";
import { Rankmark } from "../../../../domain/entities/Rankmark";
import { IRankmarkFactory } from '../../../../domain/factories/Rankmark/factory-class';
import { ICreateRankmarkRepository, IFindRankmarkByNameRepository } from "../../../repositories/Rankmark/rankmark-repositories";

interface ICreateRankmarkRequestProps {
    name: string,
    color: string,
    points: number
};

export class CreateRankmarkService {

    constructor(
        private FindRankmarkByNameRepository: IFindRankmarkByNameRepository,
        private CreateRankmarkRepository: ICreateRankmarkRepository,
        private RankmarkFactory: IRankmarkFactory
    ){};

    async execute({ name, color, points } : ICreateRankmarkRequestProps) : Promise<Result<Rankmark>>{

        const alreadyExists = await this.FindRankmarkByNameRepository.execute(name);
        
        if(alreadyExists.isSuccess){
            return Result.fail<Rankmark>('There is already a rankmark on database with this name');
        };

        const rankmark = await this.RankmarkFactory.create(name, color, points);

        const rankmarkOrError = await this.CreateRankmarkRepository.execute(rankmark);

        if(rankmarkOrError.isFailure){
            return Result.fail<Rankmark>(rankmarkOrError.error);
        };

        return Result.ok<Rankmark>(rankmarkOrError.getValue());

    };  
};