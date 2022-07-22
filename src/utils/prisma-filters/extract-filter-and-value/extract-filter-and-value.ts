import { Result } from '../errors/Result';

interface IFilterAndValue {
    filter: string,
    value: string
};

/**
 * Extracts filter and value from an string
 * @param src: Source string that will be used to extrect filter and value  
 * @pattern src must be $OR$fieldname or $AND$fieldname
 * @returns an array => index zero filter and index one value 
 */
export function extractFilterAndValue(src: string) : Result<IFilterAndValue>{

    if(src.indexOf('$') === -1 || src.indexOf('$') === src.lastIndexOf('$')){
        return Result.fail<IFilterAndValue>('String is not following the pattern')
    }

    const filter = src.substring(src.indexOf('$') + 1, src.lastIndexOf('$'));
    const value = src.substring(src.lastIndexOf('$') + 1);

    if(!filter || !value) return Result.fail<IFilterAndValue>('String is not following the pattern');

    return Result.ok<IFilterAndValue>({ filter, value });
};
