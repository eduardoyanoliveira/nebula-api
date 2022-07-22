import { User } from "../domain/entities/User";

export interface IValidateResult {
    isValid: boolean,
    user_id: string
};

/**
 * @func generate =: generate a token with the given params.
 * @func validate =: validate the token.
 */
 export interface IAuthenticationService {
    generate(user: User): string,
    validate(token: string): IValidateResult
};
