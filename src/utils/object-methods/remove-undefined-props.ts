/**
 * @param object The object to filter only defined values
 * @returns a new object if no undefined props
 */
export function removeUndefinedProps(object: Object){  
    const newObj = {};

    for(let [key, value] of Object.entries(object)){
        // if value is zero or false it must be kept
        if(value !== undefined && value !=='') newObj[key] = value;
    }; 

    return newObj;
};