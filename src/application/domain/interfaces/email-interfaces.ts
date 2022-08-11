/**
 * @attr execute =: Funtion that validates the email according to the pattern.
 */
 export interface IEmailValidator { 
    validate: (email: string) => Promise<boolean>;
};
