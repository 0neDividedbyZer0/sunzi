import { Game } from "../src/game/game";
import { runGame } from "../src/game/gameRunner";
import { humanPlayer } from "../src/players/humanPlayer";

var assert = require('assert');

describe('Game Tests', function() {
    it('Plays a Game', function() {
        runGame(new humanPlayer(), new humanPlayer(), 1, 1, 0, 0);
    });
});