import { extractFilterAndValue } from "../extract-filter-and-value/extract-filter-and-value";
import { fieldNormalizer } from "../field-normalizer";

/**
 * Its gonna be used if the filter value is an array and the key has $ signs
 * @param key filter key
 * @param values filter value
 * @returns Prisma filter object with more than one value either using AND or OR operators 
 */
export function multipleValuedFieldNormalizer(key: string, values: any){
    
    let prop = {}; 
    const tmp : object[] = [];

    const response = extractFilterAndValue(key);

    if(response.isFailure){
        throw new Error(response.error);
    };

    const filterAndValue = response.getValue();

    values.forEach((value) => {
        tmp.push(fieldNormalizer(filterAndValue.value, value));
    });

    prop[filterAndValue.filter] = tmp;

    return prop;
};