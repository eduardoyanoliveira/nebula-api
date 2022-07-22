import { UserRepository } from "../../../database/User/user-repository";
import { PasswordCryptographer } from "../../../services/Cryptography/password-cryptography";
import { UserAuthenticationService } from "./user-authentication-service";
import { JWTAuthentication } from '../../../services/Authentication/jwt-authentication';
import { UserAuthenticationController } from "./user-authentication-controller";
import { UserDTO } from "../../../DTOs/User/user-dto";

const userDTO = new UserDTO();

const repo = new UserRepository(userDTO);

const passwordCryptographer = new PasswordCryptographer();
const authenticationService = new JWTAuthentication('30d');

const userAuthenticationService = new UserAuthenticationService(
    repo,
    passwordCryptographer,
    authenticationService
);

const userAuthenticationController = new UserAuthenticationController(userAuthenticationService);

export { userAuthenticationService, userAuthenticationController };