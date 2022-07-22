import { DataToRank, IDataToRank } from "./data-to-rank";
import { IRankToResponse, RankToResponse } from "./rank-to-response";


export interface IRankDTO extends IDataToRank, IRankToResponse{};


export class RankDTO implements IRankDTO{

    public dataToRank;
    public rankToResponse;

    constructor(){
        this.dataToRank = new DataToRank().dataToRank;
        this.rankToResponse = new RankToResponse().rankToResponse;
    };
};