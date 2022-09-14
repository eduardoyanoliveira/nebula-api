import { ListBestAnswersByAuthorRepository } from "../../../database/BestAnswer/list-best-answers-by-author";
import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { ListBestAnswersByAuthorController } from "./lest-best-answers-by-author-controller";
import { ListBestAnswersByAuthorService } from "./list-best-answers-by-author-service";

const dataToUser = new DataToUser();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);
const listBestAnswerByAuthorRepository = new ListBestAnswersByAuthorRepository();

const listBestAnswerByAuthorService = new ListBestAnswersByAuthorService(
    findUserByIdRepository,
    listBestAnswerByAuthorRepository
);

const listBestAnswerByAuthorController = new ListBestAnswersByAuthorController(listBestAnswerByAuthorService);

export { listBestAnswerByAuthorController };