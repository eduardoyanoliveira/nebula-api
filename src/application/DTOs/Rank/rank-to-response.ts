import { Rank } from "../../domain/entities/Rank"; 
import { IRankResponseProps } from "./interfaces";

export interface IRankToResponse {
    transform(rank: Rank): IRankResponseProps 
};

export class RankToResponse implements IRankToResponse {

    transform(rank: Rank): IRankResponseProps {
       
        const response = {
            user_id: rank.user.id,
            username: rank.user.props.username,
            subject_id: rank.subject.id,
            subject_name: rank.subject.props.name,
            points: rank.points
        };

        return response; 
    };
};