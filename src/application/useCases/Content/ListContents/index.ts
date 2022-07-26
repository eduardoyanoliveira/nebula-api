import { ListContentsRepository } from "../../../database/Content/list-contents";
import { ContentToResponse } from "../../../DTOs/Content/content-to-response";
import { DataToContent } from "../../../DTOs/Content/data-to-content";
import { ListContentsController } from "./list-contents-controller";
import { ListContentsService } from "./list-contents-service";


const dataToContent = new DataToContent();
const contentToResponse = new ContentToResponse();

const listContentsRepository = new ListContentsRepository(dataToContent);

const listContentsService = new ListContentsService(listContentsRepository);

const listContentsController = new ListContentsController(listContentsService, contentToResponse);

export { listContentsController, listContentsService };