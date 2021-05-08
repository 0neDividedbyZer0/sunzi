import { COLOR, Move } from "../game/board";
import { Game } from "../game/game";
import { moveToString } from "../utils";
import { Player } from "./player";
const readline = require('readline')

export const name = 'humanPlayer';
//For the move method, it needs to listen for the 
//input move

export class humanPlayer extends Player {
    public chooseMove(g: Game, c: COLOR): Move {
        let b = g.getBoard;
        let legal_moves = b.legalMoves(c);
        let moveOutput: string = '';
        for (let i = 0; i < legal_moves.length; i++) {
            moveOutput = `${i}: ` + moveOutput + moveToString(legal_moves[i], c) + ' ';
        }
        let index = readline();
        return legal_moves[Number(index)];
    }
}
