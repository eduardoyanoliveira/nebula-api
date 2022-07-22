import { Content } from "../../entities/Content";
import { Subject } from "../../entities/Subject";
import { BaseContent } from "./concrete-classes";

export interface IContentFactory {
    create(description: string, url: string, subject: Subject) : Content,
};

export class ContentFactory implements IContentFactory{

    create(description: string, url: string, subject: Subject): Content {
        return BaseContent.create(description, url, subject);
    };
};