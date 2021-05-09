import { Game } from "../src/game/game";
import { runGame } from "../src/game/gameRunner";
import { humanPlayer } from "../src/players/humanPlayer";

var assert = require('assert');

describe('Game Tests', function() {
    var stdin: { send: (arg0: string) => void; };
    this.beforeEach(function () {
        stdin = require('mock-stdin').stdin();
    });
    it('Plays a Game', function() {
        process.nextTick(function mockResponse() {
            stdin.send('response');
        });
        runGame();
        //let g = new Game(new humanPlayer(), new humanPlayer());
        //assert.equal(g.isGameOver(), false);
    });
});