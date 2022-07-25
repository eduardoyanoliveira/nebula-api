import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkDataProps } from "./interfaces";


export interface IRankmarkToResponse {
    transform(rankmark: Rankmark): IRankmarkDataProps
};

export class RankmarkToResponse implements IRankmarkToResponse{

    transform(rankmark: Rankmark): IRankmarkDataProps {
        
        const response = {
            id: rankmark.id,
            ...rankmark.props
        };

        return response;
    };
    
};