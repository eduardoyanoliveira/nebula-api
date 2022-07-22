import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkDataProps } from "./interfaces";


export interface IRankmarkToResponse {
    rankmarkToResponse(rankmark: Rankmark): IRankmarkDataProps
};

export class RankmarkToResponse implements IRankmarkToResponse{

    rankmarkToResponse(rankmark: Rankmark): IRankmarkDataProps {
        
        const response = {
            id: rankmark.id,
            ...rankmark.props
        };

        return response;
    };
    
};