export const name = 'pawn'

import {Board, FILES, RANKS} from '../board'
import {Color, Piece} from './piece'
import {Space} from '../space'

enum Dir {
    UP, //This is all relative to red's position, even for Black
    LEFT,
    RIGHT,
    DOWN
}

export class Cannon extends Piece {

    constructor(color: Color, sp: Space) {
        super(color, sp);
    } 

    // Gets the space of the nearest pieces in dir's direction
    // Null if no piece in that direction
    private get_nearest(board: Board, dir: Dir): Space {
        switch(dir) {
            case Dir.UP:
                for (let i = this.get_sp().r() + 1; i < RANKS; i++) {
                    let curr: Space = board.get(this.get_sp().f(), i);
                    if (curr.c()) {
                        return curr;
                    }
                }
                break;
            case Dir.DOWN:
                for (let i = this.get_sp().r() - 1; i >= 0; i--) {
                    let curr: Space = board.get(this.get_sp().f(), i);
                    if (curr.c()) {
                        return curr;
                    }
                }
                break;
            case Dir.LEFT:
                for (let i = this.get_sp().f() + 1; i < FILES; i++) {
                    let curr: Space = board.get(i, this.get_sp().r());
                    if (curr.c()) {
                        return curr;
                    }
                }
                break;
            case Dir.RIGHT:
                for (let i = this.get_sp().f() - 1; i >= 0; i--) {
                    let curr: Space = board.get(i, this.get_sp().r());
                    if (curr.c()) {
                        return curr;
                    }
                }
                break;
        }
        return null;
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