import { UserRepository } from "../../../database/User/user-repository";
import { EmailValidator } from "../../../../utils/email/email-validator";
import { PasswordValidator } from "../../../../utils/password/password-validator";
import { PasswordCryptographer } from "../../../services/Cryptography/password-cryptography";
import { CreateUserService } from "./create-user-service";
import { CreateUserController } from "./create-user-controller";
import { UserFactory } from "../../../../domain/factories/User/factory-class";
import { UserDTO } from "../../../DTOs/User/user-dto";

const userDTO = new UserDTO();

const userRepository = new UserRepository(userDTO);

const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const passwordCryptographer = new PasswordCryptographer();
const userFactory = new UserFactory();

const createUserService = new CreateUserService(
    userRepository,
    passwordValidator,
    emailValidator,
    passwordCryptographer,
    userFactory
);


const createUserController = new CreateUserController(createUserService, userDTO);

export { createUserController, createUserService };