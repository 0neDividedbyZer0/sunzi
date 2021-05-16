"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
exports.name = 'GuiPlayer';
//For the move method, it needs to listen for the 
//input move
class GuiPlayer extends player_1.Player {
    constructor() {
        super(...arguments);
        this.resolveMove = () => { };
    }
    async chooseMove(g, c) {
        return new Promise((res) => {
            this.resolveMove = res;
        });
    }
    receiveMove(m) {
        this.resolveMove(m);
    }
}
exports.GuiPlayer = GuiPlayer;
