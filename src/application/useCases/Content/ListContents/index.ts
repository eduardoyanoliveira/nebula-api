import { ContentRepository } from "../../../database/Content/content-repository";
import { ContentDTO } from "../../../DTOs/Content/content-dto";
import { ListContentsController } from "./list-contents-controller";
import { ListContentsService } from "./list-contents-service";


const contentDTO = new ContentDTO();

const contentRepository = new ContentRepository(contentDTO);

const listContentsService = new ListContentsService(contentRepository);

const listContentsController = new ListContentsController(listContentsService, contentDTO);

export { listContentsController, listContentsService };