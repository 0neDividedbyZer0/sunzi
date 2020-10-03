export const name = 'pawn'

import {RIVER, Board} from '../board'
import {Color, Piece} from './piece'
import {Space} from '../space'

export class Cannon extends Piece {

    constructor(color: Color, sp: Space) {
        super(color, sp);
    } 

    //Gets the spaces of the nearest pieces in each direction
    private get_nearest(board: Board): Space[] {

    }

    //Gets the list of valid jump moves
    private jump_moves(board: Board): Space[] {

    }

    /**
     * Returns a list of valid moves
     */
    moves(board: Board): Space[] {
        let arr: Space[] = [];
        
    }

}