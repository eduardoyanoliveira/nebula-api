import { UserRepository } from "../../../database/User/user-repository";
import { UserDTO } from "../../../DTOs/User/user-dto";
import { ListUsersController } from "./list-users-controller";
import { ListUsersService } from "./list-users-service"

const userDTO = new UserDTO();

const repository = new UserRepository(userDTO);

const listUsersService = new ListUsersService(repository);

const listUsersController = new ListUsersController(listUsersService, userDTO);

export { listUsersController, listUsersService };