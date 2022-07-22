import { IContentDTO } from "../../DTOs/Content/content-dto";
import { IContentRepository } from "../../repositories/Content/content-repository";
import { CreateContent } from "./create-content";
import { FindContentById } from "./find-content-by-id";
import { ListContents } from "./list-contents";
import { UpdateContent } from "./update-content";

export class ContentRepository implements IContentRepository{

    public create;
    public update;
    public findById;
    public list;

    constructor(
        private ContentDTO: IContentDTO
    ){
        this.create = new CreateContent().create;
        this.update = new UpdateContent().update;
        this.findById = new FindContentById(this.ContentDTO).findById;
        this.list = new ListContents(this.ContentDTO).list;
    }; 
};