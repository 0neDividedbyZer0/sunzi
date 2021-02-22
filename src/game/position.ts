//TODO: positional object which has 14 bitboards and updates them in a cycle
//Gonna try and have it do legal move generation

import { BitBoard } from "./bitboard";

export const FILES: number = 9;
export const RANKS: number = 10;

export const G_R: bigint = BigInt(1 << 4);
export const A_R: bigint = BigInt(1 << 3) + BigInt(1 << 5);
export const E_R: bigint = BigInt(1 << 2) + BigInt(1 << 6);
export const H_R: bigint = BigInt(1 << 1) + BigInt(1 << 7);
export const R_R: bigint = BigInt(1 << 0) + BigInt(1 << 9);
export const C_R: bigint = BigInt(1 << 19) + BigInt(1 << 25);
export const P_R: bigint = BigInt(1 << 27) + BigInt(1 << 29) + BigInt(1 << 31) + BigInt(1 << 33) + BigInt(1 << 35);

export const G_B: bigint = BigInt(1 << 85);
export const A_B: bigint = BigInt(1 << 84) + BigInt(1 << 86);
export const E_B: bigint = BigInt(1 << 83) + BigInt(1 << 87);
export const H_B: bigint = BigInt(1 << 82) + BigInt(1 << 88);
export const R_B: bigint = BigInt(1 << 81) + BigInt(1 << 89);
export const C_B: bigint = BigInt(1 << 64) + BigInt(1 << 70);
export const P_B: bigint = BigInt(1 << 54) + BigInt(1 << 56) + BigInt(1 << 58) + BigInt(1 << 60) + BigInt(1 << 62);


export class Position {
    private bitboards: BitBoard[];

    constructor(toCopy: BitBoard[]) {
        this.bitboards = [];
        toCopy.forEach(element => {
            this.bitboards.push(element.copy());
        });
    }

    static start() {
        var positions: BitBoard[] = [];
        positions.push(new BitBoard(G_R));
        positions.push(new BitBoard(A_R));
        positions.push(new BitBoard(E_R));
        positions.push(new BitBoard(H_R));
        positions.push(new BitBoard(R_R));
        positions.push(new BitBoard(C_R));
        positions.push(new BitBoard(P_R));

        positions.push(new BitBoard(G_B));
        positions.push(new BitBoard(A_B));
        positions.push(new BitBoard(E_B));
        positions.push(new BitBoard(H_B));
        positions.push(new BitBoard(R_B));
        positions.push(new BitBoard(C_B));
        positions.push(new BitBoard(P_B));
        
        return new Position(positions);
    }

    copy() {
        return new Position(this.bitboards);
    }

    private boardToBits(board: Pair) {
        return board.rank * FILES + board.file;
    }

    private bitsToBoard(bits: number) {
        var board = new Pair()
        board.file = bits % FILES;
        board.rank = Math.floor(bits / FILES);
        return board;
    }

    
}

//0 is the 1st rank on the red's side, 9th file is leftmost
//red's POV
export class Pair {
    public file: number;
    public rank: number;
}