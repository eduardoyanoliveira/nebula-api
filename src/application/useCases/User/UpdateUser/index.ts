import { UserRepository } from "../../../database/User/user-repository";
import { UserDTO } from "../../../DTOs/User/user-dto";
import { UpdateUserController } from "./update-user-controller";
import { UpdateUserService } from "./update-user-service";

const userDTO = new UserDTO();

const repository = new UserRepository(userDTO);

const updateUserService = new UpdateUserService(repository);

const updateUserController = new UpdateUserController(updateUserService, userDTO);

export { updateUserService, updateUserController };