import { IRankmarkDTO } from "../../DTOs/Rankmark/rankmark-dto";
import { IRankmarkRepository } from "../../repositories/Rankmark/rankmark-repository";
import { CreateRankmark } from "./create-rankmark";
import { FindRankmarkById } from "./find-rankmark-by-id";
import { FindRankmarkByName } from "./find-rankmark-by-name";
import { ListRankmark } from "./list-rankmark";
import { UpdateRankmark } from "./update-rankmark";


export class RankmarkRepository implements IRankmarkRepository{

    public create;
    public update;
    public findByName;
    public findById;
    public list;

    constructor(
        private RankmarkDTO: IRankmarkDTO
    ){
        this.create = new CreateRankmark().create;
        this.update = new UpdateRankmark().update;
        this.findByName = new FindRankmarkByName(this.RankmarkDTO).findByName;
        this.findById = new FindRankmarkById(this.RankmarkDTO).findById;
        this.list = new ListRankmark(this.RankmarkDTO).list
    };
};