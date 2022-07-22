import { IQuestionDTO } from "../../DTOs/Question/question-dto";
import { IQuestionRepository } from "../../repositories/Question/question-repository";
import { CreateQuestion } from "./create-question";
import { FindQuestionById } from "./find-question-by-id";
import { ListQuestions } from "./list-questions";
import { UpdateQuestion } from "./update-question";


export class QuestionRepository implements IQuestionRepository{

    public create;
    public update;
    public findById;
    public list;

    constructor(
        private QuestionDTO : IQuestionDTO
    ){
        this.create = new CreateQuestion().create;
        this.update = new UpdateQuestion(this.QuestionDTO).update;
        this.findById = new FindQuestionById(this.QuestionDTO).findById;
        this.list = new ListQuestions(this.QuestionDTO).list;
    };
    
};
