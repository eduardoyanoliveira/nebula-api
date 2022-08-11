import { fieldNormalizer } from './field-normalizer';
import { multipleValuedFieldNormalizer } from './multiple-valued-field-normalizer';


export function objectToWhere(object: object){  
    let newObj = {};

    for(let [key, value] of Object.entries(object)){

        let prop = {}

        if(value instanceof Array){
            prop = multipleValuedFieldNormalizer(key, value); 
        }else{
            prop = fieldNormalizer(key, value);
        };

        newObj = {
            ...newObj,
            ...prop
        };
    }; 

    return newObj;
};

