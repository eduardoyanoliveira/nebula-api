import { CreateContentService } from "./create-content-service";
import { CreateContentController } from "./create-content-controller";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";
import { ContentToResponse } from "../../../DTOs/Content/content-to-response";
import { CreateContentRepository } from "../../../database/Content/create-content";

const dataToSubject = new DataToSubject();
const contentToResponse = new ContentToResponse();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const createContentRepository = new CreateContentRepository();

const createContentService = new CreateContentService(
    findSubjectByIdRepository, 
    createContentRepository
);

const createContentController = new CreateContentController(createContentService, contentToResponse);

export { createContentController, createContentService };