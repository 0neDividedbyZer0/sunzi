/**
 * The idea behind bitboards is to represent sets. 
 * Furthermore, using bitarrays allows it to be 
 * rather minimal in size. We shall have a 
 * bitboard per each color AND for each piece type,
 * so there are 7*2 = 14 bitboards in a list called Position
 * 7 pieces: G, A, C, P, H, E, R and the red and black sides
 * There will need to a bigInt of 90 binary digits long
 * 
 * Board representation: rightmost corner of red's side is the LSB 
 * and it ascends going to the left and upwards. Should be using
 * unsigned ints
 */

export const name = 'bitboard'

export const BOARD_SIZE: number = 90;

const FIRST_FILE: bigint = BigInt("0x00201008040201008040201");
const NINTH_FILE: bigint = FIRST_FILE << BigInt(8);

const FILES: bigint = BigInt(9);

const mask: bigint = (BigInt(1) << BigInt(BOARD_SIZE)) - BigInt(1);

export class BitBoard {
    private bits: bigint;

    constructor(bits: bigint) {
        this.bits = bits;
    }

    getBits(): bigint {
        return this.bits;
    }

    set(i: number, present: boolean): void {
        if (!Number.isInteger(i)) {
            throw "i must be an integer";
        }
        if (i >= BOARD_SIZE) {
            throw "Tried to set larger than the board's size";
        }
        let b = BigInt(1);
        let shift = BigInt(i);
        if (present) {
          this.bits = this.bits | (b << shift);
        } else {
          this.bits = this.bits & ~(b << shift);
        }
        
    }

    //Returns bigint currently, may be changed 
    get(i: number): bigint {
        if (!Number.isInteger(i)) {
            throw "i must be an integer";
        }
        if (i >= BOARD_SIZE) {
            throw "Tried to get larger than the board's size";
        }
        let b = BigInt("1");
        let shift = BigInt(i);
        return (this.bits & (b << shift)) >> shift;
    }

    isEqual(other: BitBoard): boolean {
        return this.bits == other.getBits();
    }

    isEmpty(): boolean {
        return this.bits == BigInt(0);
    }

    and(other: BitBoard): BitBoard {
        return new BitBoard(this.bits & other.getBits());
    }

    or(other: BitBoard): BitBoard {
        return new BitBoard(this.bits | other.getBits());
    }

    not(): BitBoard {
        return new BitBoard(~this.bits && mask);
    }
    
    //Least significant one bit
    ls1b(): BitBoard {
        return new BitBoard(this.bits & -this.bits);
    }

    isSingle(): boolean {
        return this.bits != BigInt(0) && ((this.bits & (this.bits - BigInt(1))) == BigInt(0)); 
    }

    popCount(): number {
        let count = 0;
        let x = this.bits;
        while (x) {
            count++;
            x &= x - BigInt(1);
        }
        return count;
    }

    copy(): BitBoard {
        return new BitBoard(this.bits);
    }

    //Safely shifts without wrapping
    shiftLeft1(): BitBoard {
        var temp = (this.bits & ~NINTH_FILE) << BigInt(1);
        return new BitBoard(temp);
    }

    shiftRight1(): BitBoard {
        var temp = (this.bits & ~FIRST_FILE) >> BigInt(1);
        return new BitBoard(temp);
    }

    shiftVert(shift: number): BitBoard {
        let s = BigInt(Math.abs(shift));
        if (shift > 0) {
            var temp = this.bits << (FILES * s);
        } else {
            var temp = this.bits >> (FILES * s);
        }
        return new BitBoard(temp & mask);
    }

    //TODO MSB aka bitscan reverse?
}