export const name = 'board'

import {Square} from './space'

/**
 * The board's absolute position is based on
 * red's orientation. Files are numbered 
 * right to left, from 1-9, ranks are numbered
 * down to up. The perspective is from red, so
 * the right-corner in red is F:1 R:1
 */

const FILES: number = 9;
const RANKS: number = 10;

class Board {
    private board: Square[];
    
    constructor() {
        for (let i = 0; i < FILES; i++) {
            for (let j = 0; j < RANKS; j++) {
                this.board.push(new Square(i, j));
            }
        }
    }

}