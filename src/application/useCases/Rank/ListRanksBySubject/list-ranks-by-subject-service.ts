import { Result } from "../../../core/Result";
import { Rank } from "../../../domain/entities/Rank";
import { IListRanksBySubjectRepository } from "../../../repositories/Rank/rank-repositories";
import { IFindSubjectByIdRepository } from "../../../repositories/Subject/subject-repositories";

interface IListRanksBySubjectProps {
    subject_id: string,
};

export class ListRanksBySubjectService{

    constructor(
        private FindSubjectByIdRepository : IFindSubjectByIdRepository,
        private ListRanksBySubjectRepository : IListRanksBySubjectRepository
    ){};

    async execute({ subject_id } : IListRanksBySubjectProps) : Promise<Result<Rank[]>>{

        const subjectOrError = await this.FindSubjectByIdRepository.execute(subject_id);

        // checks if the subject exists
        if(subjectOrError.isFailure){
            return Result.fail<Rank[]>(subjectOrError.error);
        };

        const ranksOrError = await this.ListRanksBySubjectRepository.execute(subjectOrError.getValue().id);

        // Checks if any error ocurred on database infra layer
        if(ranksOrError.isFailure){
            return Result.fail<Rank[]>(ranksOrError.error);
        };

        return Result.ok<Rank[]>(ranksOrError.getValue());
    };
};