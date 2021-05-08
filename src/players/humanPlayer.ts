import { COLOR, Move } from "../game/board";
import { Game } from "../game/game";
import { moveToString } from "../utils";
import { Player } from "./player";
import * as readline from 'readline';

export const name = 'humanPlayer';
//For the move method, it needs to listen for the 
//input move

export class humanPlayer extends Player {
    private input: readline.Interface;
    public constructor() {
        super();
        this.input = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public chooseMove(g: Game, c: COLOR): Move {
        let b = g.getBoard;
        let legal_moves = b.legalMoves(c);
        let moveOutput: string = '';
        for (let i = 0; i < legal_moves.length; i++) {
            moveOutput = moveOutput + `${i}: ` + moveToString(legal_moves[i], c) + ' ';
        }
        let index;
        this.input.question('What move?\n' + moveOutput, (answer: string) => {
            index = answer;
        })
        return legal_moves[Number(index)];
    }
}
