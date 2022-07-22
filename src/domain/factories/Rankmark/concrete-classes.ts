import { IRankmarkProps, Rankmark } from "../../entities/Rankmark";

export class BaseRankmark implements IRankmarkProps {
    name: string;
    color: string;
    points: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;

    private constructor(name: string, color: string, points: number){
        this.name = name;
        this.color = color;
        this.points= points;
        this.is_active = true;
        this.created_at = new Date();
        this.updated_at = new Date();
    };

    static create(name: string, color: string, points: number) : Rankmark{
        const baseRankmark = new BaseRankmark(name, color, points);
        return Rankmark.create(baseRankmark);
    };
};