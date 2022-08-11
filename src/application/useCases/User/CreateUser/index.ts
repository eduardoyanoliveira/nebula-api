import { EmailValidator } from "../../email/email-validator";
import { PasswordValidator } from "../../password/password-validator";
import { PasswordCryptographer } from "../../../services/Cryptography/password-cryptography";
import { CreateUserService } from "./create-user-service";
import { CreateUserController } from "./create-user-controller";
import { UserFactory } from "../../../domain/factories/User/factory-class";
import { CreateUserRepository } from "../../../database/User/create-user";
import { FindUserByEmailRepository } from "../../../database/User/find-user-by-email";
import { UserToResponse } from "../../../DTOs/User/user-to-response";
import { DataToUser } from "../../../DTOs/User/data-to-user";

const dataToUser = new DataToUser();
const userToResponse = new UserToResponse();

const findUserByEmailRepository = new FindUserByEmailRepository(dataToUser);
const createUserRepository = new CreateUserRepository();

const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const passwordCryptographer = new PasswordCryptographer();
const userFactory = new UserFactory();

const createUserService = new CreateUserService(
    findUserByEmailRepository,
    createUserRepository,
    passwordValidator,
    emailValidator,
    passwordCryptographer,
    userFactory
);


const createUserController = new CreateUserController(createUserService, userToResponse);

export { createUserController, createUserService };