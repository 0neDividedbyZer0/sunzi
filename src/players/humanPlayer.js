"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const player_1 = require("./player");
exports.name = 'humanPlayer';
//For the move method, it needs to listen for the 
//input move
class humanPlayer extends player_1.Player {
    async chooseMove(g, c) {
        let b = g.getBoard;
        let legal_moves = b.legalMoves(c);
        let moveOutput = b.toString();
        for (let i = 0; i < legal_moves.length; i++) {
            moveOutput = moveOutput + `${i}: ` + utils_1.moveToString(legal_moves[i], c) + ' ';
        }
        let time = g.timeLeftPretty(c);
        let index = await this.query(`Time: ${time[0]}:${time[1]}\n\n What move?\n\n` + moveOutput + '\n>');
        return legal_moves[Number(index)];
        //We're gonna have a chooseMove that's for gui
    }
    //For testing/ commandline stuff
    query(question) {
        var prompt = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((res) => {
            prompt.question(question, (ans) => {
                prompt.close();
                res(ans);
            });
        });
    }
}
exports.humanPlayer = humanPlayer;
