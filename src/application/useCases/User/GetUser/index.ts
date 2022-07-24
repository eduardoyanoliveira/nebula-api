import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { UserToResponse } from "../../../DTOs/User/user-to-response";
import { GetUserController } from "./get-user-controller";
import { GetUserService } from "./get-user-service";

const dataToUser = new DataToUser();
const userToResponse = new UserToResponse();

const repository = new FindUserByIdRepository(dataToUser);

const getUserService = new GetUserService(repository);

const getUserController = new GetUserController(getUserService, userToResponse);

export { getUserService, getUserController };