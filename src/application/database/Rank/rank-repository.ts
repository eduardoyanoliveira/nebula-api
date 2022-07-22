import { IRankDTO } from "../../DTOs/Rank/rank-dto";
import { IRankRepository } from "../../repositories/Rank/rank-repository";
import { GenerateSubjectRanks } from "./generate-subject-ranks";
import { GenerateUserRanks } from "./generate-user-ranks";
import { ListRanksBySubject } from "./list-ranks-by-subject";
import { UpdateUserPoints } from "./update-user-points";

export class RankRepository implements IRankRepository{
    public generateUserRanks;
    public generateSubjectRanks;
    public listRanksBySubject;
    public updateUserPoints;

    constructor(
        private RankDTO : IRankDTO
    ){
        this.generateUserRanks = new GenerateUserRanks().generateUserRanks;
        this.generateSubjectRanks = new GenerateSubjectRanks().generateSubjectRanks;
        this.listRanksBySubject = new ListRanksBySubject(this.RankDTO).listRanksBySubject;
        this.updateUserPoints = new UpdateUserPoints().updateUserPoints;
    }
};