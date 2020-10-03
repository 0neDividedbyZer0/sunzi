export const name = 'pawn'

import {RIVER, Board} from '../board'
import {Color, Piece} from './piece'
import {Space} from '../space'

const MOVE: number = 1; 

export class Pawn extends Piece {

    constructor(color: Color, sp: Space) {
        super(color, sp);
    }

    private crossed_river() {
        if (this.get_color() == Color.RED) {
            return this.get_sp().r() > RIVER.RED;
        } else {
            return this.get_sp().r() < RIVER.BLACK;
        }
    }
    /**
     * Returns a list of valid moves
     */
    moves(board: Board): Space[] {
        let arr: Space[] = [];
        let mv: Space = board.get_rel(this.get_sp(), 0, 1);
        if (mv && mv.c() != this.get_color()) {
            arr.push(mv);
        }
        if (this.crossed_river()) {
            mv = board.get_rel(this.get_sp(), 1, 0);
            if (mv && mv.c() != this.get_color()) {
                arr.push(mv);
            }
            mv = board.get_rel(this.get_sp(), -1, 0);
            if (mv && mv.c() != this.get_color()) {
                arr.push(mv);
            }
        }
        return arr;
    }

}