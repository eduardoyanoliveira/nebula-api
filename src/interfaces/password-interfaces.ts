/**
 * @attr pattern =: String that describes the pattern that the password should have.
 * @func validate =: Funtion that validates the password according to the pattern.
 */
 export interface IPasswordValidator {
    pattern: string, 
    validate: (password: string) => Promise<boolean>;
};


/**
 * @func crypt =: recives a string returns a promise with a cryptographed string.
 * @func compare =: compare with a normal string matches the another cryptographed.
 */
export interface IPasswordCryptographer {
    crypt(password: string): Promise<string>,
    compare(password: string, cryptographedPassword: string): Promise<boolean>
};
