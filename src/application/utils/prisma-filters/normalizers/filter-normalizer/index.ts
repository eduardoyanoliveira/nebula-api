import { Result } from "../../errors/Result";
import { extractFilterAndValue } from "../../extract-filter-and-value/extract-filter-and-value";
import { fieldNormalizer } from "../../field-normalizer";

interface IFilter {
    [index: string] : string
}

interface IFilterNormalizer {
    [index: string] : IFilter
};

/**
 * @param value property value with the filter
 * @returns a prisma formated filter object
 */
export function filterNormalizer(value: string) : Result<IFilterNormalizer>{

    const response = extractFilterAndValue(value);

    if(response.isFailure){
        return Result.fail<IFilterNormalizer>(response.error);
    };

    return Result.ok<IFilterNormalizer>(fieldNormalizer(response.getValue().filter, response.getValue().value));
};