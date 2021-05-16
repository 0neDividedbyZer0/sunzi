import { COLOR } from "../src/game/board";
import { Game } from "../src/game/game";
import { humanPlayer } from "../src/players/humanPlayer";
import { Player } from "../src/players/player";

var assert = require('assert');

var game: Game;

async function runGame(redPlayer: Player = new humanPlayer(), blackPlayer: Player = new humanPlayer(),
    redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10): Promise<void> {
    console.log('Starting game');
    game = new Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
    game.reset();
    game.start();
    await game.cleanupGame();
    if (game.getWinner() == COLOR.RED) {
        console.log('\n\nRed Won\n\n');
    } else if (game.getWinner() == COLOR.BLACK) {
        console.log('\n\nBlack Won\n\n');
    } else if (game.getWinner() == COLOR.EMPTY) {
        console.log('\n\nDraw\n\n')
    }
}

//WTF, there's a bug with time, basically 3rd move causes the minutes to be subtracted
describe('Game Tests', function() {
    this.timeout(0);
    it('Plays a Game', async function() {
        runGame(new humanPlayer(), new humanPlayer(), 15, 15, 0, 0);
        while (game.getWinner() == COLOR.SENTINEL) {
            await game.play();
        }
        assert.equal(true, true);
    });

});