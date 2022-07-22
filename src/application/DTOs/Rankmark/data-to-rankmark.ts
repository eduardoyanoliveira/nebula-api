import { Rankmark } from "../../../domain/entities/Rankmark";
import { IRankmarkDataProps } from "./interfaces";

export interface IDataToRankmark {
    dataToRankmark(rankmarkData: IRankmarkDataProps): Rankmark
};

export class DataToRankmark implements IDataToRankmark{

    dataToRankmark(rankmarkData: IRankmarkDataProps): Rankmark {
        const { id, ...props } = rankmarkData;

        const rankmark = Rankmark.create(props, id);

        return rankmark;
    };
};