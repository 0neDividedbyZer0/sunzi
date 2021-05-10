import { COLOR, Move } from "../game/board";
import { Game } from "../game/game";
import { moveToString } from "../utils";
import { Player } from "./player";
import * as readline from 'readline';

export const name = 'humanPlayer';
//For the move method, it needs to listen for the 
//input move

export class humanPlayer extends Player {
    private prompt = require('readline-sync');

    public chooseMove(g: Game, c: COLOR): Move {
        let b = g.getBoard;
        let legal_moves = b.legalMoves(c);
        let moveOutput: string = b.toString();
        for (let i = 0; i < legal_moves.length; i++) {
            moveOutput = moveOutput + `${i}: ` + moveToString(legal_moves[i], c) + ' ';
        }
        let index = this.prompt.question('What move?\n\n' + moveOutput + '\n>');
        return legal_moves[Number(index)];
    }

    public query(prompt: string) {
        console.log(prompt);
        return new Promise(function (resolve) {
            process.stdin.once('data', function(data) {
                resolve(data.toString().trim());
            });
        });
    }
}
