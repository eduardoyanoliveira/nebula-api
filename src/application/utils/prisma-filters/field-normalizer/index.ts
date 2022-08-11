import { Result } from "../errors/Result";
import { booleanNormalizer } from "../normalizers/boolean-normalizer";
import { dateNormalizer, regexDatetime } from "../normalizers/date-normalizer";
import { filterNormalizer } from "../normalizers/filter-normalizer";
import { likeNormalizer } from "../normalizers/like-normalizer";

function basicNormalizer(value : any): Result<any> {
    return Result.ok<any>(value);
};

const valueNormalizers = {
    date: dateNormalizer,          // Transform ISO date string into Date object
    boolean: booleanNormalizer,   // Transforms string boolean into normal boolean value
    like: likeNormalizer,        // Creates a like operation with the value
    filters: filterNormalizer,  // if value has any filter it applies the filter
    basic: basicNormalizer,    //  Returns the same value 
};

function getNormalizerType(value: any) : string {
    if(regexDatetime.test(value)) return 'date';
    if(value[0] === '$') return 'filters';
    if(value === 'true' || value === 'false') return 'boolean';
    if(String(value).includes('%')) return 'like';
    return 'basic';
};

/**
 * Normalizer the field acording to the key and value
 * @param key query param key
 * @param value query param value
 * @returns a normalized object
 */
export function fieldNormalizer(key: string, value: any){
    
    let prop = {};

    if(value === undefined || value === '') return prop;

    const normalizer = valueNormalizers[getNormalizerType(value)];

    const response = normalizer(value);

    if(response.isFailure){
        throw new Error(response.error);
    };

    prop[key] = response.getValue();

    return prop;

};
