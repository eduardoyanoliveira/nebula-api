import { Content } from "../../../domain/entities/Content";
import { IContentResponseProps } from "./interfaces";

export interface IContentToResponse {
    contentToResponse(content: Content): IContentResponseProps
};

export class ContentToResponse implements IContentToResponse{

    contentToResponse(content: Content): IContentResponseProps {
       const {id, props} = content;

       const { subject, ...rest } = props;

       const { id: subjectId, props: subjectProps} = subject;

        const response = {
            id: id,
            ...rest,
            subject: {
                id: subjectId,
                ...subjectProps
            }
        };

        return response;
    };
    
};