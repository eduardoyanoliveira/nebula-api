import { IContentProps, Content } from "../../entities/Content";
import { Subject } from "../../entities/Subject";

export class BaseContent implements IContentProps {

    description: string;
    url: string;
    subject: Subject;
    created_at: Date;
    updated_at: Date;

    private constructor(description: string, url: string, subject: Subject){
        
        this.description = description;
        this.url = url;
        this.subject = subject;
        this.created_at = new Date();
        this.updated_at = new Date();
    };

    static create(description: string, url: string, subject: Subject) : Content{
        const baseContent = new BaseContent(description, url, subject);
        
        const content = Content.create(baseContent);
        return content;
    };
};