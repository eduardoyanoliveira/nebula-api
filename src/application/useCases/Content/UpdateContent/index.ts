import { ContentRepository } from "../../../database/Content/content-repository";
import { SubjectRepository } from "../../../database/Subject/subject-repository";
import { ContentDTO } from "../../../DTOs/Content/content-dto";
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { UpdateContentController } from "./update-content-controller";
import { UpdateContentService } from "./update-content-service";

const subjectDTO = new SubjectDTO();
const contentDTO = new ContentDTO();

const subjectRepository = new SubjectRepository(subjectDTO);
const contentRepository = new ContentRepository(contentDTO);

const updateContentService = new UpdateContentService(subjectRepository, contentRepository);

const updateContentController = new UpdateContentController(updateContentService, contentDTO);

export { updateContentController, updateContentService };