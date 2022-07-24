import { ListUsersRepository } from "../../../database/User/list-users";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { UserToResponse } from "../../../DTOs/User/user-to-response";
import { ListUsersController } from "./list-users-controller";
import { ListUsersService } from "./list-users-service"

const userToResponse = new UserToResponse();
const dataToUser = new DataToUser();

const listUsersRepository = new ListUsersRepository(dataToUser);

const listUsersService = new ListUsersService(listUsersRepository);

const listUsersController = new ListUsersController(listUsersService, userToResponse);

export { listUsersController, listUsersService };