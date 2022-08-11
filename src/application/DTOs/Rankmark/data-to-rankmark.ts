import { Rankmark } from "../../domain/entities/Rankmark";
import { IRankmarkDataProps } from "./interfaces";

export interface IDataToRankmark {
    transform(rankmarkData: IRankmarkDataProps): Rankmark
};

export class DataToRankmark implements IDataToRankmark{

    transform(rankmarkData: IRankmarkDataProps): Rankmark {
        const { id, ...props } = rankmarkData;

        const rankmark = Rankmark.create(props, id);

        return rankmark;
    };
};