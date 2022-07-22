import { IAnswerDTO } from "../../DTOs/Answers/answer-dto";
import { IAnswerRepository } from "../../repositories/Answer/answer-repository";
import { CreateAnswer } from "./create-answer";
import { FindAnswerById } from "./find-answer-by-id";
import { ListAnswers } from "./list-answers";
import { UpdateAnswer } from "./update-answer";

export class AnswerRepository implements IAnswerRepository{

    public create;
    public update;
    public list;
    public findById;

    constructor(
        private AnswerDTO: IAnswerDTO
    ){
        this.create = new CreateAnswer().create;
        this.update = new UpdateAnswer().update;
        this.list = new ListAnswers(this.AnswerDTO).list;
        this.findById = new FindAnswerById(this.AnswerDTO).findById;
    };
    
};