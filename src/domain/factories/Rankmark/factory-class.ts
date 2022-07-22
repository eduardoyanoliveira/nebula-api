import { Rankmark } from "../../entities/Rankmark";
import { BaseRankmark } from "./concrete-classes";

export interface IRankmarkFactory {
    create(name: string, color: string, points: number) : Rankmark,
};

export class RankmarkFactory implements IRankmarkFactory{

    create(name: string, color: string, points: number): Rankmark {
        return BaseRankmark.create(name, color, points);
    };
};