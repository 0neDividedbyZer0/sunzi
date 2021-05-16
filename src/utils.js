"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("./game/board");
exports.name = 'utils';
//We'll see if we even need it.
//Pawn notation is still unknown
//Pawn notation is complex. If you have doubled or lined up file pawns
// pawns, you replace the P with the file its on and its order, 1 being the frontmost
//Thus 61+1 means pawn on the 6th file closest to the opposite side
//Advisor/Elephant notation when doubled needs no +-
const expr = new RegExp('^(([GAEHRCPgaehrcp][1-9])|([+-][HRChrc])|([1-9][1-5])[=+-]([0-9]|1[0]))$');
const simpleMove = /^[1-9][Ff][0-9]+[rR][>][1-9][fF][0-9]+[rR]$/;
const BOARD_TOTAL = board_1.BOARD_FILES * board_1.BOARD_RANKS;
function commandToMove(input, c, board) {
    let stripped = input.replace(/\s+/g, '').toUpperCase();
    if (!expr.test(stripped)) {
        throw 'Incorrect command input';
    }
    let piece = stripped.substring(0, 2);
    let movement = stripped.substring(2, 4);
    let sameFile = false;
    let advanced;
    let p;
    if (piece.substring(0, 1) === '+') {
        sameFile = true;
        advanced = true;
        p = piece.substring(1, 2);
    }
    else if (piece.substring(0, 1) === '-') {
        sameFile = true;
        advanced = false;
        p = piece.substring(1, 2);
    }
    else {
        p = piece.substring(0, 1);
    }
    //Check for files and stuff
    //Filter the appropriate pieces when using special notation
    switch (p) {
        case 'G':
            break;
        case 'A':
            break;
        case 'E':
            break;
        case 'H':
            break;
        case 'R':
            break;
        case 'C':
            break;
        case 'P':
            break;
        default:
            throw 'error, piece parsed incorrectly';
    }
    return new board_1.Move(-1, -1);
}
exports.commandToMove = commandToMove;
//This is more important for formatting
function moveToCommand(move, c, board) {
    return '';
}
exports.moveToCommand = moveToCommand;
function parseMove(input, c) {
    let stripped = input.replace(/\s+/g, '');
    let split = stripped.split(/[FfRr]/);
    let init = toBoard(Number(split[0]), Number(split[1]));
    let final = toBoard(Number(split[2]), Number(split[3]));
    if (c == board_1.COLOR.BLACK) {
        init = reflect(init);
        final = reflect(final);
    }
    return new board_1.Move(-1, -1);
}
exports.parseMove = parseMove;
function moveToString(move, c) {
    let init = move.initial;
    let final = move.final;
    if (c == board_1.COLOR.BLACK) {
        init = reflect(init);
        final = reflect(final);
    }
    let split_init = toCoords(init);
    let split_final = toCoords(final);
    return `${split_init.f}f${split_init.r}r>${split_final.f}f${split_final.r}r`;
}
exports.moveToString = moveToString;
function toCoords(index) {
    return { f: index % board_1.BOARD_FILES, r: Math.floor(index / board_1.BOARD_FILES) - 1 };
}
exports.toCoords = toCoords;
function toBoard(init_f, init_r) {
    return (init_r + 2) * board_1.BOARD_FILES + init_f;
}
exports.toBoard = toBoard;
function reflect(index) {
    return BOARD_TOTAL - 1 - index;
}
exports.reflect = reflect;
