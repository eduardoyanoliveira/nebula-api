import { CreateContentService } from "./create-content-service";
import { ContentRepository } from '../../../database/Content/content-repository';
import { ContentFactory } from "../../../../domain/factories/Content/factory-class";
import { CreateContentController } from "./create-content-controller";
import { ContentDTO } from "../../../DTOs/Content/content-dto";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";

const dataToSubject = new DataToSubject();
const contentDTO = new ContentDTO();

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const contentRepository = new ContentRepository(contentDTO);

const contentFactory = new ContentFactory();

const createContentService = new CreateContentService(findSubjectByIdRepository, contentFactory, contentRepository);

const createContentController = new CreateContentController(createContentService, contentDTO);

export { createContentController, createContentService };