import { UserRepository } from "../../../database/User/user-repository";
import { UserDTO } from "../../../DTOs/User/user-dto";
import { GetUserController } from "./get-user-controller";
import { GetUserService } from "./get-user-service";

const userDTO = new UserDTO();

const repository = new UserRepository(userDTO);

const getUserService = new GetUserService(repository);

const getUserController = new GetUserController(getUserService, userDTO);

export { getUserService, getUserController };