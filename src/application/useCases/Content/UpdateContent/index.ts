import { ContentRepository } from "../../../database/Content/content-repository";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";
import { ContentDTO } from "../../../DTOs/Content/content-dto";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { UpdateContentController } from "./update-content-controller";
import { UpdateContentService } from "./update-content-service";

const dataToSubject = new DataToSubject();
const contentDTO = new ContentDTO();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const contentRepository = new ContentRepository(contentDTO);

const updateContentService = new UpdateContentService(findSubjectByIdRepository, contentRepository);

const updateContentController = new UpdateContentController(updateContentService, contentDTO);

export { updateContentController, updateContentService };