import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { UserToResponse } from "../../../DTOs/User/user-to-response";
import { FindUserByIdController } from "./find-user-by-id-controller";
import { FindUserByIdService } from "./find-user-by-id-service";

const dataToUser = new DataToUser();
const userToResponse = new UserToResponse();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const findUserByIdService = new FindUserByIdService(findUserByIdRepository);

const findUserByIdController = new FindUserByIdController(findUserByIdService, userToResponse);

export { findUserByIdService, findUserByIdController, findUserByIdRepository };