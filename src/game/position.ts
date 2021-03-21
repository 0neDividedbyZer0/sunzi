//TODO: positional object which has 14 bitboards and updates them in a cycle
//Gonna try and have it do legal move generation

import { BitBoard } from "./bitboard";

export const FILES: number = 9;
export const RANKS: number = 10;

export const G_R: number[] = [4];
export const A_R: number[] = [3, 5];
export const E_R: number[] = [2, 6];
export const H_R: number[] = [1, 7];
export const R_R: number[] = [0, 9];
export const C_R: number[] = [19, 25];
export const P_R: number[] = [27, 29, 31, 33, 35];

export const G_B: number[] = [85];
export const A_B: number[] = [84, 86];
export const E_B: number[] = [83, 87];
export const H_B: number[] = [82, 88];
export const R_B: number[] = [81, 89];
export const C_B: number[] = [64, 70];
export const P_B: number[] = [54, 56, 58, 60, 62];

export const INDICES: number[][] = [G_R, A_R, E_R, H_R, R_R, C_R, P_R, G_B, A_B, E_B, H_B, R_B, C_B, P_B];

const one: bigint = BigInt(1);
const zero: bigint = BigInt(0);

const RED_MASK: BitBoard = new BitBoard((one << BigInt(45)) - one);
const BLACK_MASK: BitBoard = RED_MASK.not();

export class Position {
    private bitboards: BitBoard[];

    constructor(toCopy: BitBoard[]) {
        this.bitboards = [];
        toCopy.forEach(element => {
            this.bitboards.push(element.copy());
        });
    }

    private static makeBitBoards() {
        var boards: BitBoard[] = []  
        INDICES.forEach(piece => {
            var b = new BitBoard(zero);
            piece.forEach(i => {
                b.set(i, true);
            });
            boards.push(b);
        });
        return boards;
    }

    static start() {
        return new Position(this.makeBitBoards());
    }

    copy() {
        return new Position(this.bitboards);
    }

    private boardToBits(board: Pair) {
        return board.rank * FILES + board.file;
    }

    private bitsToBoard(bits: number) {
        var board = new Pair();
        board.file = bits % FILES;
        board.rank = Math.floor(bits / FILES);
        return board;
    }

    private all() {
        var boards = new BitBoard(BigInt(0));
        boards = boards.not();
        this.bitboards.forEach(b => {
            boards = boards.and(b);
        });
        return boards;
    }

    private red() {
        var boards = new BitBoard(BigInt(0));
        boards = boards.not();
        for (let i = 0; i < 7; i++) {
            boards = boards.and(this.bitboards[i]);
        }
        return boards;
    }

    private black() {
        var boards = new BitBoard(BigInt(0));
        boards = boards.not();
        for (let i = 7; i < this.bitboards.length; i++) {
            boards = boards.and(this.bitboards[i]);
        }
        return boards;
    }

    private red_pawn_moves(): BitBoard {
        //approach is to add shifts
        //Basically, vertical shift is fine
        //horizontal shifts will require wrapping
        //by zeroing out edges
        //Also, can mask the bottom half of the board horizontally
        //to get rid of horizontal moves below river? as long as vertical
        //is done afterwards, it should be fine
        //Algorithm: first do horizontal shifts, then mask off
        //below river, and then generate vertical shifts and 
        //union. Then do standard checks for pieces in the way
        //and stuff. 
        var result = this.bitboards[6].shiftLeft1();
        result = result.and(this.bitboards[6].shiftRight1());
        result = result.and(BLACK_MASK);
        result = result.and(this.bitboards[6].shiftVert(1));
        return result;
    }

    private black_pawn_moves(): BitBoard {
        var result = this.bitboards[0].shiftLeft1();
        result = result.and(this.bitboards[13].shiftRight1());
        result = result.and(RED_MASK);
        result = result.and(this.bitboards[13].shiftVert(-1));
        return result;
    }

    //have a legal move generator, legal moves are
    //pseudolegal moves that do not put general 
    //in check or in line of sight of opposite general

    
}

//0 is the 1st rank on the red's side, 9th file is leftmost
//red's POV
export class Pair {
    public file: number = -1;
    public rank: number = -1;
}