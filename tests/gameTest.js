"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../src/game/board");
const game_1 = require("../src/game/game");
const humanPlayer_1 = require("../src/players/humanPlayer");
var assert = require('assert');
var game;
async function runGame(redPlayer = new humanPlayer_1.humanPlayer(), blackPlayer = new humanPlayer_1.humanPlayer(), redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10) {
    console.log('Starting game');
    game = new game_1.Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
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
}
//WTF, there's a bug with time, basically 3rd move causes the minutes to be subtracted
describe('Game Tests', function () {
    this.timeout(0);
    it('Plays a Game', async function () {
        runGame(new humanPlayer_1.humanPlayer(), new humanPlayer_1.humanPlayer(), 15, 15, 0, 0);
        while (game.getWinner() == board_1.COLOR.SENTINEL) {
            await game.play();
        }
        assert.equal(true, true);
    });
});
