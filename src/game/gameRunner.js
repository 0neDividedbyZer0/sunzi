"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const humanPlayer_1 = require("../players/humanPlayer");
const board_1 = require("./board");
const game_1 = require("./game");
exports.name = 'gameRunner';
//Basically has all the main method stuff
async function runGame(redPlayer = new humanPlayer_1.humanPlayer(), blackPlayer = new humanPlayer_1.humanPlayer(), redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10) {
    console.log('Starting game');
    let game = new game_1.Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
    game.reset();
    game.start();
    await game.cleanupGame();
    if (game.getWinner() == board_1.COLOR.RED) {
        console.log('\n\nRed Won\n\n');
    }
    else if (game.getWinner() == board_1.COLOR.BLACK) {
        console.log('\n\nBlack Won\n\n');
    }
    else if (game.getWinner() == board_1.COLOR.EMPTY) {
        console.log('\n\nDraw\n\n');
    }
    process.exit(0);
}
exports.runGame = runGame;
runGame(new humanPlayer_1.humanPlayer(), new humanPlayer_1.humanPlayer(), 1, 1, 0, 0);
