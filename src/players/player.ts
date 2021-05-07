import { Board, COLOR, Move } from "../game/board";

export const name = 'player'

export interface Player {
    //chooseMove(b: Board, c: color)
    (b: Board, c: COLOR): Move;
}