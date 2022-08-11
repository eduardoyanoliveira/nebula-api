import { Result } from "../../errors/Result";

interface ILikeNormalizer {
    [index: string] : string
};

/**
 * @param value that will be used to create a like operation on prisma
 * @returns operation => startsWith if value has a % sign only at the benning
 * @returns operation => endsWith if value has a % sign only at the end
 * @returns operation => contains if value has a % sign at the benning and one at the end
 */
export function likeNormalizer(value: string): Result<ILikeNormalizer>{
    const positions = {
        start: value[0] === '%',
        end: value[value.length - 1] === '%'
    };

    if(positions.start && !positions.end) return Result.ok<ILikeNormalizer>({ startsWith: value.substring(1) });
    if(!positions.start && positions.end) return Result.ok<ILikeNormalizer>({ endsWith: value.substring(0, value.length - 1) });
    if(positions.start && positions.end) return Result.ok<ILikeNormalizer>({ contains: value.slice( 1, -1 ) });

    return Result.fail<ILikeNormalizer>('Value string has any wildcard');
};
