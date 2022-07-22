import { ISubjectDTO } from "../../DTOs/Subject/subject-dto";
import { ISubjectRepository } from "../../repositories/Subject/subject-repository";
import { CreateSubject } from "./create-subject";
import { FindSubjectById } from "./find-subject-by-id";
import { FindSubjectByName } from "./find-subject-by-name";
import { ListSubjects } from "./list-subjects";
import { UpdateSubject } from "./update-subject";


export class SubjectRepository implements ISubjectRepository{

   
    public create;
    public update;
    public findById;
    public findByName;
    public list;


    constructor(
        private SubjectDTO: ISubjectDTO
    ){
        this.create = new CreateSubject().create;
        this.update = new UpdateSubject().update;
        this.findById = new FindSubjectById(this.SubjectDTO).findById;
        this.findByName = new FindSubjectByName(this.SubjectDTO).findByName;
        this.list = new ListSubjects(this.SubjectDTO).list;
    };
    
};