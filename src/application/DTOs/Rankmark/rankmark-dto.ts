import { DataToRankmark, IDataToRankmark } from "./data-to-rankmark";
import { IRankmarkToResponse, RankmarkToResponse } from "./rankmark-to-response";


export interface IRankmarkDTO extends IDataToRankmark, IRankmarkToResponse{};


export class RankmarkDTO implements IRankmarkDTO{

    public dataToRankmark;
    public rankmarkToResponse;

    constructor(){
        this.dataToRankmark = new DataToRankmark().dataToRankmark;
        this.rankmarkToResponse = new RankmarkToResponse().rankmarkToResponse;
    };
};
