import { COLOR, Move } from "../game/board";
import { Game } from "../game/game";
import { moveToString } from "../utils";
import { Player } from "./player";
import * as readline from 'readline';

export const name = 'humanPlayer';
//For the move method, it needs to listen for the 
//input move

export class humanPlayer extends Player {
    private prompt = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    public async chooseMove(g: Game, c: COLOR): Promise<Move> {
        let b = g.getBoard;
        let legal_moves = b.legalMoves(c);
        let moveOutput: string = b.toString();
        for (let i = 0; i < legal_moves.length; i++) {
            moveOutput = moveOutput + `${i}: ` + moveToString(legal_moves[i], c) + ' ';
        }
        let time = g.timeLeftPretty(c);
        let index = await this.query(`Time: ${time[0]}:${time[1]}\n\n What move?\n\n` + moveOutput + '\n>');
        return legal_moves[Number(index)];
    }

    private query(question: string): Promise<string> {
        return new Promise<string>((res) => {
            this.prompt.question(question, (ans:string) => {
                this.prompt.close();
                res(ans);
            });
        });
    }

}
