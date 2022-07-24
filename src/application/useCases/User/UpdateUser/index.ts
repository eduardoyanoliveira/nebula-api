import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { UpdateUserRepository } from "../../../database/User/update-user";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { UserToResponse } from "../../../DTOs/User/user-to-response";
import { UpdateUserController } from "./update-user-controller";
import { UpdateUserService } from "./update-user-service";

const dataToUser = new DataToUser();
const userToResponse = new UserToResponse();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);
const updateUserRepository = new UpdateUserRepository();

const updateUserService = new UpdateUserService(findUserByIdRepository, updateUserRepository);

const updateUserController = new UpdateUserController(updateUserService, userToResponse);

export { updateUserService, updateUserController };