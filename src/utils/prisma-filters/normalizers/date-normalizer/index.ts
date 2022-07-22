import { Result } from "../../errors/Result";

export const regexDatetime = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])(T([01]?[0-9]|2[0-3])(:[0-5][0-9])(:[0-5][0-9])?)?$/;

export function dateNormalizer(value): Result<Date> {
    return Result.ok<Date>(new Date(value))
};