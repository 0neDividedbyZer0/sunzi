"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../game/board");
exports.name = 'player';
class Player {
    async chooseMove(g, c) { return new board_1.Move(-1, -1); }
}
exports.Player = Player;
