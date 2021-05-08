import { Game } from "../src/game/game";
import { runGame } from "../src/game/gameRunner";
import { humanPlayer } from "../src/players/humanPlayer";

var assert = require('assert');

describe('Game Tests', function() {
    describe('Play Game Test', function() {
        runGame();
        //let g = new Game(new humanPlayer(), new humanPlayer());
        //assert.equal(g.isGameOver(), false);
    });
});