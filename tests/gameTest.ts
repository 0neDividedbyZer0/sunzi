import { Game } from "../src/game/game";
import { runGame } from "../src/game/gameRunner";
import { humanPlayer } from "../src/players/humanPlayer";

var assert = require('assert');


//WTF, there's a bug with time, basically 3rd move causes the minutes to be subtracted
describe('Game Tests', function() {
    it('Plays a Game', function() {
        runGame(new humanPlayer(), new humanPlayer(), 15, 15, 0, 0);
    });

});