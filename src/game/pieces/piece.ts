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
        this.sp.set_c(this.color);
    }

    set_sp(sp: Space): void {
        this.sp.set_c(null);
        this.sp = sp;
        this.sp.set_c(this.color);
    }

    get_color(): Color {
        return this.color;
    }

    get_sp(): Space {
        return this.sp;
    }

    abstract moves(board: Board): Space[];

}