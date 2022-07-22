import { ContentToResponse, IContentToResponse } from "./content-to-response";
import { DataToContent, IDataToContent } from "./data-to-content";

export interface IContentDTO extends IDataToContent, IContentToResponse{};

export class ContentDTO implements IContentDTO{

    public dataToContent;
    public contentToResponse;

    constructor(){
        this.dataToContent = new DataToContent().dataToContent,
        this.contentToResponse = new ContentToResponse().contentToResponse
    };
};