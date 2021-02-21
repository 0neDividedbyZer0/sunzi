/**
 * The idea behind bitboards is to represent sets. 
 * Furthermore, using bitarrays allows it to be 
 * rather minimal in size. We shall have a 
 * bitboard per each color AND for each piece type,
 * so there are 7*2 = 14 bitboards in a list called Position
 * 7 pieces: G, A, C, P, H, E, R and the red and black sides
 * There will need to be a boolean array of 90
 */
export const name = 'bitboard'

export class BitBoard {
    private boolarray: boolean[];

    constructor() {
        this.boolarray = Array(90).fill(false);
    }

    set(i: number, val: boolean) {
        this.boolarray[i] = val;
    }

    get(i: number) {
        return this.boolarray[i];
    }
    
    //TODO: add in all the set operations for bitboard manipulation

}