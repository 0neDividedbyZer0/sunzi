export const name = 'board'

import {Piece} from './pieces/piece'
import {Space} from './space'

/**
 * The board's absolute position is based on
 * red's orientation. Files are numbered 
 * right to left, from 1-9, ranks are numbered
 * down to up. The perspective is from red, so
 * the right-corner in red is F:1 R:1
 * (In implementation, they are labeled from 0)
 */

export const FILES: number = 9;0
export const RANKS: number = 10;

//What file is each side's section of the river
export const RIVER = {
    RED: 4,
    BLACK: 5
};

export const R_RIVER: number = 4;
//Black's side of the river
export const B_RIVER: number = 5;

export class Board {
    private board: Space[];
    private r_pieces: Piece[];
    private b_pieces: Piece[];
    
    constructor() {
        this.board = [];
        for (let i = 0; i < RANKS; i++) {
            for (let j = 0; j < FILES; j++) {
                this.board.push(new Space(j, i, null));
            }
        }
    }

    get(file: number, rank: number): Space {
        if (file < 0 || file >= FILES) {
            return null;
        }
        if (rank < 0 || rank >= RANKS) {
            return null;
        }
        return this.board[rank * FILES + file];
    }

    get_rel(curr: Space, files_to_add: number, ranks_to_add: number): Space {
        return this.get(curr.f() + files_to_add, curr.r() + ranks_to_add);
    }

    is_occupied(sp: Space): boolean {
        return sp.c() != null;
    }


}