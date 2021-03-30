"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = 'board';
//11x14 board with two sentinel rows and files. Piece lists
//Two boards, one with colors, the other with piece types.
//Deal with horses leaping offbound on the edges with wraparound
//TODO: convert to 11x12? With how we're doing blocking, the horses 
//are fine
/**
 * The board's absolute position is based on
 * red's orientation. Files are numbered
 * right to left, from 1-9, ranks are numbered
 * down to up. The perspective is from red, so
 * the right-corner in red is F:1 R:1
 * (In implementation, they are labeled from 0)
 */
const FILES = 9;
const RANKS = 10;
exports.BOARD_FILES = 11;
exports.BOARD_RANKS = 14;
const RED_RIVERBANK = 6;
const BLACK_RIVERBANK = 7;
const RED_GENERAL_PALACE = [26, 27, 28, 37, 38, 39, 48, 49, 50];
const BLACK_GENERAL_PALACE = [103, 104, 105, 114, 115, 116, 125, 126, 127];
const RED_ELEPHANT_INDICES = [3, 7, 23, 27, 31, 47, 51];
const BLACK_ELEPHANT_INDICES = [102, 106, 122, 126, 130, 146, 150];
const START_BOARD_C = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 1, 0, 0, 0, 0, 0, 1, 0, -1,
    -1, 1, 0, 1, 0, 1, 0, 1, 0, 1, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 2, 0, 2, 0, 2, 0, 2, 0, 2, -1,
    -1, 0, 2, 0, 0, 0, 0, 0, 2, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 2, 2, 2, 2, 2, 2, 2, 2, 2, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];
const START_BOARD_P = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 5, 4, 3, 2, 1, 2, 3, 4, 5, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 6, 0, 0, 0, 0, 0, 6, 0, -1,
    -1, 7, 0, 7, 0, 7, 0, 7, 0, 7, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 7, 0, 7, 0, 7, 0, 7, 0, 7, -1,
    -1, 0, 6, 0, 0, 0, 0, 0, 6, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 5, 4, 3, 2, 1, 2, 3, 4, 5, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];
const EMPTY_BOARD_C = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];
const EMPTY_BOARD_P = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];
const RED_GENERALS = [27];
const RED_ADVISORS = [26, 28];
const RED_ELEPHANTS = [25, 29];
const RED_HORSES = [24, 30];
const RED_CHARIOTS = [23, 31];
const RED_CANNONS = [46, 52];
const RED_PAWNS = [56, 58, 60, 62, 64];
const BLACK_GENERALS = [126];
const BLACK_ADVISORS = [125, 127];
const BLACK_ELEPHANTS = [124, 128];
const BLACK_HORSES = [123, 129];
const BLACK_CHARIOTS = [122, 130];
const BLACK_CANNONS = [101, 107];
const BLACK_PAWNS = [89, 91, 93, 95, 97];
var COLOR;
(function (COLOR) {
    COLOR[COLOR["EMPTY"] = 0] = "EMPTY";
    COLOR[COLOR["RED"] = 1] = "RED";
    COLOR[COLOR["BLACK"] = 2] = "BLACK";
    COLOR[COLOR["SENTINEL"] = -1] = "SENTINEL";
})(COLOR = exports.COLOR || (exports.COLOR = {}));
;
var PIECE;
(function (PIECE) {
    PIECE[PIECE["EMPTY"] = 0] = "EMPTY";
    PIECE[PIECE["GENERAL"] = 1] = "GENERAL";
    PIECE[PIECE["ADVISOR"] = 2] = "ADVISOR";
    PIECE[PIECE["ELEPHANT"] = 3] = "ELEPHANT";
    PIECE[PIECE["HORSE"] = 4] = "HORSE";
    PIECE[PIECE["CHARIOT"] = 5] = "CHARIOT";
    PIECE[PIECE["CANNON"] = 6] = "CANNON";
    PIECE[PIECE["PAWN"] = 7] = "PAWN";
    PIECE[PIECE["SENTINEL"] = -1] = "SENTINEL";
})(PIECE = exports.PIECE || (exports.PIECE = {}));
;
/**
 *  10 9 8 7 6 5 4 3 2 1 0, red side
 */
class Board {
    constructor() {
        this.colors = Object.assign([], EMPTY_BOARD_C);
        this.pieces = Object.assign([], EMPTY_BOARD_P);
        this.redGenerals = [];
        this.redAdvisors = [];
        this.redElephants = [];
        this.redHorses = [];
        this.redChariots = [];
        this.redCannons = [];
        this.redPawns = [];
        this.blackGenerals = [];
        this.blackAdvisors = [];
        this.blackElephants = [];
        this.blackHorses = [];
        this.blackChariots = [];
        this.blackCannons = [];
        this.blackPawns = [];
    }
    //TODO: check for emptiness at the index where the move is being made
    //Create moves for a pawn at INDEX
    pawnMoves(index) {
        var moves = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY ||
                this.get(index, 1, DIR.N) == COLOR.BLACK) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.N)));
            }
            if (Math.floor(index / exports.BOARD_FILES) > RED_RIVERBANK) {
                if (this.get(index, 1, DIR.E) == COLOR.EMPTY ||
                    this.get(index, 1, DIR.E) == COLOR.BLACK) {
                    moves.push(new Move(index, this.get_ind(index, 1, DIR.E)));
                }
                if (this.get(index, 1, DIR.W) == COLOR.EMPTY ||
                    this.get(index, 1, DIR.W) == COLOR.BLACK) {
                    moves.push(new Move(index, this.get_ind(index, 1, DIR.W)));
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY ||
                this.get(index, 1, DIR.S) == COLOR.RED) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.S)));
            }
            if (Math.floor(index / exports.BOARD_FILES) < BLACK_RIVERBANK) {
                if (this.get(index, 1, DIR.E) == COLOR.EMPTY ||
                    this.get(index, 1, DIR.E) == COLOR.RED) {
                    moves.push(new Move(index, this.get_ind(index, 1, DIR.E)));
                }
                if (this.get(index, 1, DIR.W) == COLOR.EMPTY ||
                    this.get(index, 1, DIR.W) == COLOR.RED) {
                    moves.push(new Move(index, this.get_ind(index, 1, DIR.W)));
                }
            }
            return moves;
        }
        else {
            throw "There was an empty piece at " + index;
        }
    }
    generalMoves(index) {
        var moves = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY ||
                this.get(index, 1, DIR.N) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.N);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY ||
                this.get(index, 1, DIR.E) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.E);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY ||
                this.get(index, 1, DIR.S) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.S);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY ||
                this.get(index, 1, DIR.W) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.W);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY ||
                this.get(index, 1, DIR.N) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.N);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY ||
                this.get(index, 1, DIR.E) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.E);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY ||
                this.get(index, 1, DIR.S) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.S);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY ||
                this.get(index, 1, DIR.W) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.W);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        throw "No general at index " + index;
    }
    advisorMoves(index) {
        var moves = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.NE) == COLOR.EMPTY ||
                this.get(index, 1, DIR.NE) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.NE);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.NW) == COLOR.EMPTY ||
                this.get(index, 1, DIR.NW) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.NW);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SW) == COLOR.EMPTY ||
                this.get(index, 1, DIR.SW) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.SW);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SE) == COLOR.EMPTY ||
                this.get(index, 1, DIR.SE) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.SE);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.NE) == COLOR.EMPTY ||
                this.get(index, 1, DIR.NE) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.NE);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.NW) == COLOR.EMPTY ||
                this.get(index, 1, DIR.NW) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.NW);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SW) == COLOR.EMPTY ||
                this.get(index, 1, DIR.SW) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.SW);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SE) == COLOR.EMPTY ||
                this.get(index, 1, DIR.SE) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.SE);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        throw "No advisor at index " + index;
    }
    elephantMoves(index) {
        var moves = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.NE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.NE);
                if (RED_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.RED) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.NW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.NW);
                if (RED_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.RED) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.SW);
                if (RED_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.RED) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.SE);
                if (RED_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.RED) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.NE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.NE);
                if (BLACK_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.BLACK) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.NW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.NW);
                if (BLACK_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.BLACK) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.SW);
                if (BLACK_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.BLACK) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 2, DIR.SE);
                if (BLACK_ELEPHANT_INDICES.includes(i) && this.colors[i] != COLOR.BLACK) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        throw "No elephant at index " + index;
    }
    horseMoves(index) {
        var moves = [];
        let res;
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                res = index + 2 * exports.BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
                res = index + 2 * exports.BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                res = index - 2 * exports.BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
                res = index - 2 * exports.BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                res = index + exports.BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
                res = index - exports.BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                res = index + exports.BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
                res = index - exports.BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                res = index + 2 * exports.BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
                res = index + 2 * exports.BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                res = index - 2 * exports.BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
                res = index - 2 * exports.BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                res = index + exports.BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
                res = index - exports.BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                res = index + exports.BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
                res = index - exports.BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            return moves;
        }
        throw "No horse at index " + index;
    }
    chariotMoves(index) {
        let moves = [];
        let rank = Math.floor(index / exports.BOARD_FILES);
        let file = index % exports.BOARD_FILES;
        if (this.colors[index] == COLOR.RED) {
            for (let i = rank + 1; i < exports.BOARD_RANKS; i++) {
                if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    break;
                }
                else {
                    break;
                }
            }
            for (let i = rank - 1; i >= 0; i--) {
                if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    break;
                }
                else {
                    break;
                }
            }
            for (let i = file + 1; i < exports.BOARD_FILES; i++) {
                if (this.colors[rank + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank + i));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                    moves.push(new Move(index, rank + i));
                    break;
                }
                else {
                    break;
                }
            }
            for (let i = file - 1; i >= 0; i--) {
                if (this.colors[rank + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank + i));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                    moves.push(new Move(index, rank + i));
                    break;
                }
                else {
                    break;
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            for (let i = rank + 1; i < exports.BOARD_RANKS; i++) {
                if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    break;
                }
                else {
                    break;
                }
            }
            for (let i = rank - 1; i >= 0; i--) {
                if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                    moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    break;
                }
                else {
                    break;
                }
            }
            for (let i = file + 1; i < exports.BOARD_FILES; i++) {
                if (this.colors[rank + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank + i));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                    moves.push(new Move(index, rank + i));
                    break;
                }
                else {
                    break;
                }
            }
            for (let i = file - 1; i >= 0; i--) {
                if (this.colors[rank + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank + i));
                }
                else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                    moves.push(new Move(index, rank + i));
                    break;
                }
                else {
                    break;
                }
            }
            return moves;
        }
        throw "Not a chariot at index " + index;
    }
    cannonMoves(index) {
        let moves = [];
        let rank = Math.floor(index / exports.BOARD_FILES);
        let file = index % exports.BOARD_FILES;
        let first_seen = false;
        if (this.colors[index] == COLOR.RED) {
            first_seen = false;
            for (let i = rank + 1; i < exports.BOARD_RANKS; i++) {
                if (!first_seen) {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        break;
                    }
                }
            }
            first_seen = false;
            for (let i = rank - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        break;
                    }
                }
            }
            first_seen = false;
            for (let i = file + 1; i < exports.BOARD_FILES; i++) {
                if (!first_seen) {
                    if (this.colors[rank + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank + i));
                    }
                    else if (this.colors[rank + i] == COLOR.BLACK
                        || this.colors[rank + i] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[rank + i] == COLOR.BLACK) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[rank + i] == COLOR.SENTINEL ||
                        this.colors[rank + i] == COLOR.RED) {
                        break;
                    }
                }
            }
            first_seen = false;
            for (let i = file - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[rank + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank + i));
                    }
                    else if (this.colors[rank + i] == COLOR.BLACK
                        || this.colors[rank + i] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[rank + i] == COLOR.BLACK) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[rank + i] == COLOR.SENTINEL ||
                        this.colors[rank + i] == COLOR.RED) {
                        break;
                    }
                }
            }
            return moves;
        }
        else if (this.colors[index] == COLOR.BLACK) {
            first_seen = false;
            for (let i = rank + 1; i < exports.BOARD_RANKS; i++) {
                if (!first_seen) {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                        break;
                    }
                }
            }
            first_seen = false;
            for (let i = rank - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[i * exports.BOARD_FILES + file] == COLOR.RED) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[i * exports.BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * exports.BOARD_FILES + file] == COLOR.BLACK) {
                        break;
                    }
                }
            }
            first_seen = false;
            for (let i = file + 1; i < exports.BOARD_FILES; i++) {
                if (!first_seen) {
                    if (this.colors[rank + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank + i));
                    }
                    else if (this.colors[rank + i] == COLOR.BLACK
                        || this.colors[rank + i] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[rank + i] == COLOR.RED) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[rank + i] == COLOR.SENTINEL ||
                        this.colors[rank + i] == COLOR.BLACK) {
                        break;
                    }
                }
            }
            first_seen = false;
            for (let i = file - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[rank + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank + i));
                    }
                    else if (this.colors[rank + i] == COLOR.BLACK
                        || this.colors[rank + i] == COLOR.RED) {
                        first_seen = true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.colors[rank + i] == COLOR.RED) {
                        moves.push(new Move(index, i * exports.BOARD_FILES + file));
                        break;
                    }
                    else if (this.colors[rank + i] == COLOR.SENTINEL ||
                        this.colors[rank + i] == COLOR.BLACK) {
                        break;
                    }
                }
            }
            return moves;
        }
        throw "Not a cannon at index " + index;
    }
    //Needs absolute pin and check and general LOS checking
    generateMoves(c) {
        var moves = [];
        if (c == COLOR.RED) {
            this.redGenerals.forEach(p => {
                moves = moves.concat(this.generalMoves(p));
            });
            this.redAdvisors.forEach(p => {
                moves = moves.concat(this.advisorMoves(p));
            });
            this.redElephants.forEach(p => {
                moves = moves.concat(this.elephantMoves(p));
            });
            this.redHorses.forEach(p => {
                moves = moves.concat(this.horseMoves(p));
            });
            this.redChariots.forEach(p => {
                moves = moves.concat(this.chariotMoves(p));
            });
            this.redCannons.forEach(p => {
                moves = moves.concat(this.cannonMoves(p));
            });
            this.redPawns.forEach(p => {
                moves = moves.concat(this.pawnMoves(p));
            });
            return moves;
        }
        else if (c == COLOR.BLACK) {
            this.blackGenerals.forEach(p => {
                moves = moves.concat(this.generalMoves(p));
            });
            this.blackAdvisors.forEach(p => {
                moves = moves.concat(this.advisorMoves(p));
            });
            this.blackElephants.forEach(p => {
                moves = moves.concat(this.elephantMoves(p));
            });
            this.blackHorses.forEach(p => {
                moves = moves.concat(this.horseMoves(p));
            });
            this.blackChariots.forEach(p => {
                moves = moves.concat(this.chariotMoves(p));
            });
            this.blackCannons.forEach(p => {
                moves = moves.concat(this.cannonMoves(p));
            });
            this.blackPawns.forEach(p => {
                moves = moves.concat(this.pawnMoves(p));
            });
            return moves;
        }
        throw "Invalid color chosen";
    }
    makeMove(m) {
        //Check the state of the game and stuff and evolve the board
    }
    //Make a new board 
    copy() {
        return new Board();
    }
    //Safely gets the index in a certain direction without wrapping
    get_ind(index, steps, dir) {
        let rank = Math.floor(index / exports.BOARD_FILES);
        let file = index % exports.BOARD_FILES;
        switch (dir) {
            case DIR.E:
                if (file - steps > 0) {
                    return rank * exports.BOARD_FILES + file - steps;
                }
                return -1;
                break;
            case DIR.NE:
                let limit1 = Math.min(file, exports.BOARD_RANKS - 1 - rank);
                if (steps <= limit1) {
                    return index + (exports.BOARD_FILES - 1) * steps;
                }
                return -1;
                break;
            case DIR.N:
                if (rank + steps < exports.BOARD_RANKS) {
                    return (rank + steps) * exports.BOARD_FILES + file;
                }
                return -1;
                break;
            case DIR.NW:
                let limit2 = Math.min(exports.BOARD_FILES - 1 - file, exports.BOARD_RANKS - 1 - rank);
                if (steps <= limit2) {
                    return index + (exports.BOARD_FILES + 1) * steps;
                }
                return -1;
                break;
            case DIR.W:
                if (file + steps < exports.BOARD_FILES) {
                    return rank * exports.BOARD_FILES + file + steps;
                }
                return -1;
                break;
            case DIR.SW:
                let limit3 = Math.min(exports.BOARD_FILES - 1 - file, rank);
                if (steps <= limit3) {
                    return index - (exports.BOARD_FILES - 1) * steps;
                }
                return -1;
                break;
            case DIR.S:
                if (rank - steps > 0) {
                    return (rank - steps) * exports.BOARD_FILES + file;
                }
                return -1;
                break;
            case DIR.SE:
                let limit4 = Math.min(file, rank);
                if (steps <= limit4) {
                    return index - (exports.BOARD_FILES + 1) * steps;
                }
                return -1;
                break;
            default:
                throw "Invalid direction";
        }
    }
    /**
     * Safely gets COLOR piece in a certain direction DIR from
     * INDEX STEPS steps away. If offboard, returns -1
     * STEPS is assumed to be positive
     */
    get(index, steps, dir) {
        let i = this.get_ind(index, steps, dir);
        if (i < 0) {
            return COLOR.SENTINEL;
        }
        return this.colors[i];
    }
    /**
     * Checks if both colors and pieces make sense.
     * Piece lists are NOT checked
     *
     */
    isValid() {
        for (let i = 0; i < exports.BOARD_FILES * exports.BOARD_RANKS; i++) {
            if (this.colors[i] == COLOR.SENTINEL) {
                if (this.pieces[i] != PIECE.SENTINEL) {
                    return false;
                }
            }
            if (this.colors[i] == COLOR.EMPTY) {
                if (this.pieces[i] != PIECE.EMPTY) {
                    return false;
                }
            }
            if (this.colors[i] == COLOR.RED || this.colors[i] == COLOR.BLACK) {
                if (this.pieces[i] == PIECE.SENTINEL ||
                    this.pieces[i] == PIECE.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }
    isEqual(other) {
        for (let i = 0; i < exports.BOARD_FILES * exports.BOARD_RANKS; i++) {
            if (this.colors[i] != other.colors[i] || this.pieces[i] != other.pieces[i]) {
                return false;
            }
        }
        return true;
    }
    setColor(f, r, color) {
        this.colors[r * exports.BOARD_FILES + f] = color;
    }
    setPiece(f, r, piece) {
        this.pieces[r * exports.BOARD_FILES + f] = piece;
    }
    getColor(f, r) {
        return this.colors[r * exports.BOARD_FILES + f];
    }
    getPiece(f, r) {
        return this.pieces[r * exports.BOARD_FILES + f];
    }
}
exports.Board = Board;
;
//From red's perspective always
/**  3 2 1
 *   4   0
 *   5 6 7
 */
var DIR;
(function (DIR) {
    DIR[DIR["E"] = 0] = "E";
    DIR[DIR["NE"] = 1] = "NE";
    DIR[DIR["N"] = 2] = "N";
    DIR[DIR["NW"] = 3] = "NW";
    DIR[DIR["W"] = 4] = "W";
    DIR[DIR["SW"] = 5] = "SW";
    DIR[DIR["S"] = 6] = "S";
    DIR[DIR["SE"] = 7] = "SE";
})(DIR = exports.DIR || (exports.DIR = {}));
;
class Move {
    constructor(initial, final) {
        this.initial = initial;
        this.final = final;
    }
    isEqual(other) {
        return this.initial == other.initial && this.final == other.final;
    }
}
exports.Move = Move;
;
