import { CreateContentService } from "./create-content-service";
import { ContentRepository } from '../../../database/Content/content-repository';
import { SubjectRepository } from "../../../database/Subject/subject-repository";
import { ContentFactory } from "../../../../domain/factories/Content/factory-class";
import { CreateContentController } from "./create-content-controller";
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { ContentDTO } from "../../../DTOs/Content/content-dto";

const subjectDTO = new SubjectDTO();
const contentDTO = new ContentDTO();

const subjectRepository = new SubjectRepository(subjectDTO);
const contentRepository = new ContentRepository(contentDTO);

const contentFactory = new ContentFactory();

const createContentService = new CreateContentService(subjectRepository, contentFactory, contentRepository);

const createContentController = new CreateContentController(createContentService, contentDTO);

export { createContentController, createContentService };