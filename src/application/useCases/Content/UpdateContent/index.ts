import { FindContentByIdRepository } from "../../../database/Content/find-content-by-id";
import { UpdateContentRepository } from "../../../database/Content/update-content";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";
import { ContentToResponse } from "../../../DTOs/Content/content-to-response";
import { DataToContent } from "../../../DTOs/Content/data-to-content";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { UpdateContentController } from "./update-content-controller";
import { UpdateContentService } from "./update-content-service";

const dataToSubject = new DataToSubject();
const dataToContent = new DataToContent();
const contentToResponse = new ContentToResponse();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const findContentByIdRepository = new FindContentByIdRepository(dataToContent);
const updateContentRepository = new UpdateContentRepository();

const updateContentService = new UpdateContentService(
    findSubjectByIdRepository, 
    findContentByIdRepository,
    updateContentRepository    
);

const updateContentController = new UpdateContentController(updateContentService, contentToResponse);

export { updateContentController, updateContentService };