export const name = 'piece'

import {Board} from '../board'
import {Space} from '../space'

export enum Color {
    RED,
    BLACK
}

export abstract class Piece {
    private color: Color;
    private sp: Space;

    constructor(color: Color, sp: Space) {
        this.color = color;
        this.sp = sp;
    }

    get_color(): Color {
        return this.color;
    }

    get_sp(): Space {
        return this.sp;
    }

    abstract moves(board: Board): Space[];

}