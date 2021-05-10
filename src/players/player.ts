import { Board, COLOR, Move } from "../game/board";
import { Game } from "../game/game";

export const name = 'player'

export class Player {
    public async chooseMove(g: Game, c: COLOR): Promise<Move> {return new Move(-1, -1)}
}