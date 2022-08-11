import { Result } from "../../errors/Result";

/**
 * 
 * @param value string value to convert into boolean
 * @returns a boolean value
 */
export function booleanNormalizer(value: string) : Result<boolean>{
    return Result.ok<boolean>(value === 'true');
};
