/**
* Gets random int
* @param max 
* @returns random int - 0 & max inclusive
*/
export function getRandomNumberMax(max : number) : number {
	max = Math.floor(max);
    // Between 0 and max
    return Math.floor(Math.random() * (max + 1));
};