import { Board, COLOR, Move } from "../game/board";
import { Game } from "../game/game";

export const name = 'player'

export class Player {
    public chooseMove(g: Game, c: COLOR): Move {return new Move(-1, -1)}
}