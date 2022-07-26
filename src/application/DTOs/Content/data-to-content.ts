import { Content } from "../../../domain/entities/Content";
import { Subject } from "../../../domain/entities/Subject";
import { IContentDataProps } from "./interfaces";


export interface IDataToContent {
    transform(contentData: IContentDataProps): Content
};

export class DataToContent implements IDataToContent{

    transform(contentData: IContentDataProps): Content {
        const { id, subject, subject_id, ...rest } = contentData;
        
        const { id: subjectId, ...subjectProps } = subject;

        const newSubject = Subject.create(subjectProps, subjectId);

        const props = {
            ...rest,
            subject: newSubject
        };

        const content = Content.create(props, id);

        return content;
    };
};