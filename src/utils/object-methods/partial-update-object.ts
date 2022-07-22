import { removeUndefinedProps } from "./remove-undefined-props";

/**
 * @param object the object to be updated 
 * @param updateValues new values to be altered on the object (must be in object format with same key names)
 */
export function partialUpdateObject(object : Object, updateValues: Object){
    return Object.assign(object, removeUndefinedProps(updateValues));
};