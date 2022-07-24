import { PasswordCryptographer } from "../../../services/Cryptography/password-cryptography";
import { UserAuthenticationService } from "./user-authentication-service";
import { JWTAuthentication } from '../../../services/Authentication/jwt-authentication';
import { UserAuthenticationController } from "./user-authentication-controller";
import { FindUserByEmailRepository } from "../../../database/User/find-user-by-email";
import { DataToUser } from "../../../DTOs/User/data-to-user";

const dataToUser = new DataToUser();

const findUserByEmailRepository = new FindUserByEmailRepository(dataToUser);

const passwordCryptographer = new PasswordCryptographer();
const authenticationService = new JWTAuthentication('30d');

const userAuthenticationService = new UserAuthenticationService(
    findUserByEmailRepository,
    passwordCryptographer,
    authenticationService
);

const userAuthenticationController = new UserAuthenticationController(userAuthenticationService);

export { userAuthenticationService, userAuthenticationController };