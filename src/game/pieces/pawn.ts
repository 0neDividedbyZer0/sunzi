export const name = 'pawn'

import {RIVER} from '../board'
import {Color, Piece} from './piece'
import {Space} from '../space'

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
    moves(): Space[] {
        lst: Space[];
        if (this.crossed_river()) {
            
        }
    }

}