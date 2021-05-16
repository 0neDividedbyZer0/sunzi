"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
exports.name = 'MachinePlayer';
class MachinePlayer extends player_1.Player {
    constructor() {
        super(...arguments);
        this.resolveMove = () => { };
    }
    //Think resolves the move
    think() {
    }
    async finishedThinking() {
    }
}
exports.MachinePlayer = MachinePlayer;
