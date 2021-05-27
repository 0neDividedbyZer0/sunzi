import { COLOR } from "../src/game/board";
import { Game } from "../src/game/game";
import { BruteForcePlayer } from "../src/players/bruteForcePlayer";
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

describe('Game Tests', function() {
    this.timeout(0);
    it('Plays a Game', async function() {
        let black = new BruteForcePlayer();
        runGame(new humanPlayer(), black, 15, 15, 0, 0);
        while (game.getWinner() == COLOR.SENTINEL) {
            if (game.getTurn == COLOR.BLACK) {
                await Promise.all([game.play(), black.think(game)]);
            } else {
                await game.play();
            }
            
        }
        assert.equal(true, true);
    });

});