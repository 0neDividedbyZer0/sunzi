export const name = 'board'

/**
 * The board's absolute position is based on
 * red's orientation. Files are numbered 
 * right to left, from 1-9, ranks are numbered
 * down to up. The perspective is from red, so
 * the right-corner in red is F:1 R:1
 * (In implementation, they are labeled from 0)
 */

const FILES: number = 9;
const RANKS: number = 10;

export const BOARD_FILES: number = 11;
export const BOARD_RANKS: number = 14;

const RED_RIVERBANK: number = 6;
const BLACK_RIVERBANK: number = 7;

const RED_GENERAL_PALACE: number[] = [26, 27, 28, 37, 38, 39, 48, 49, 50];
const BLACK_GENERAL_PALACE: number[] = [103, 104, 105, 114, 115, 116, 125, 126, 127];

const RED_ELEPHANT_INDICES: number[] = [25, 29, 45, 49, 53, 69, 73 ];
const BLACK_ELEPHANT_INDICES: number[] = [80, 84, 100, 104, 108, 124, 128];

const START_BOARD_C: COLOR[] = [
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

const START_BOARD_P: PIECE[] = [
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

const EMPTY_BOARD_C: COLOR[] = [
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

const EMPTY_BOARD_P: PIECE[] = [
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

const RED_GENERALS: number[] = [27];
const RED_ADVISORS: number[] = [26, 28];
const RED_ELEPHANTS: number[] = [25, 29];
const RED_HORSES: number[] = [24, 30];
const RED_CHARIOTS: number[] = [23, 31];
const RED_CANNONS: number[] = [46, 52];
const RED_PAWNS: number[] = [56, 58, 60, 62, 64];

const BLACK_GENERALS: number[] = [126];
const BLACK_ADVISORS: number[] = [125, 127];
const BLACK_ELEPHANTS: number[] = [124, 128];
const BLACK_HORSES: number[] = [123, 129];
const BLACK_CHARIOTS: number[] = [122, 130];
const BLACK_CANNONS: number[] = [101, 107];
const BLACK_PAWNS: number[] = [89, 91, 93, 95, 97];


export enum COLOR {
    EMPTY,
    RED,
    BLACK,
    SENTINEL = -1
};

export enum PIECE {
    EMPTY,
    GENERAL,
    ADVISOR,
    ELEPHANT,
    HORSE,
    CHARIOT,
    CANNON,
    PAWN,
    SENTINEL = -1
};

/**          
 *  10 9 8 7 6 5 4 3 2 1 0, red side
 */

export class Board {
    public colors: COLOR[];
    public pieces: PIECE[];

    public redGenerals: number[];
    public redAdvisors: number[];
    public redElephants: number[];
    public redHorses: number[];
    public redChariots: number[];
    public redCannons: number[];
    public redPawns: number[];

    public blackGenerals: number[];
    public blackAdvisors: number[];
    public blackElephants: number[];
    public blackHorses: number[];
    public blackChariots: number[];
    public blackCannons: number[];
    public blackPawns: number[];
    
    public constructor() {
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

    //Create moves for a pawn at INDEX
    private pawnMoves(index: number): Move[] {
        var moves: Move[] = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY || 
                this.get(index, 1, DIR.N) == COLOR.BLACK) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.N)));
            }
            if (Math.floor(index / BOARD_FILES) > RED_RIVERBANK) {
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
        } else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY || 
                this.get(index, 1, DIR.S) == COLOR.RED) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.S)));
            }
            if (Math.floor(index / BOARD_FILES) < BLACK_RIVERBANK) {
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
        } else {
            throw "There was an empty piece at " + index;
        }
    }

    private generalMoves(index: number): Move[] {
        var moves: Move[] = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY || 
                this.get(index, 1, DIR.N) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.N)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY || 
                this.get(index, 1, DIR.E) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.E)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY || 
                this.get(index, 1, DIR.S) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.S)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY || 
                this.get(index, 1, DIR.W) == COLOR.BLACK) {
                let i = this.get_ind(index, 1, DIR.W)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY || 
                this.get(index, 1, DIR.N) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.N)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY || 
                this.get(index, 1, DIR.E) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.E)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY || 
                this.get(index, 1, DIR.S) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.S)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY || 
                this.get(index, 1, DIR.W) == COLOR.RED) {
                let i = this.get_ind(index, 1, DIR.W)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        throw "No general at index " + index;
    }

    private advisorMoves(index: number): Move[] {
        var moves: Move[] = [];
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
        } else if (this.colors[index] == COLOR.BLACK) {
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

    private elephantMoves(index: number): Move[] {
        var moves: Move[] = [];
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
        } else if (this.colors[index] == COLOR.BLACK) {
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

    private horseMoves(index: number): Move[] {
        var moves: Move[] = [];
        let res;
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                res = index + 2*BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }

                res = index + 2*BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                res = index - 2*BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }

                res = index - 2*BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                res = index + BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }

                res = index - BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                res = index + BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }

                res = index - BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.BLACK) {
                    moves.push(new Move(index, res));
                }
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                res = index + 2*BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }

                res = index + 2*BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                res = index - 2*BOARD_FILES - 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }

                res = index - 2*BOARD_FILES + 1;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                res = index + BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }

                res = index - BOARD_FILES - 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                res = index + BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }

                res = index - BOARD_FILES + 2;
                if (this.colors[res] == COLOR.EMPTY || this.colors[res] == COLOR.RED) {
                    moves.push(new Move(index, res));
                }
            }
            return moves;
        }
        throw "No horse at index " + index;
    }

    private chariotMoves(index: number): Move[] {
        let moves: Move[] = [];
        let rank = Math.floor(index / BOARD_FILES);
        let file = index % BOARD_FILES;
        if (this.colors[index] == COLOR.RED) {
            for (let i = rank + 1; i < BOARD_RANKS; i++) {
                if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                } else if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                    break;
                } else {
                    break;
                }
            }

            for (let i = rank - 1; i >= 0; i--) {
                if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                } else if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                    break;
                } else {
                    break;
                }
            }

            for (let i = file + 1; i < BOARD_FILES; i++) {
                if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                } else if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                    break;
                } else {
                    break;
                }
            }

            for (let i = file - 1; i >= 0; i--) {
                if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                } else if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                    break;
                } else {
                    break;
                }
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            for (let i = rank + 1; i < BOARD_RANKS; i++) {
                if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                } else if(this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                    break;
                } else {
                    break;
                }
            }

            for (let i = rank - 1; i >= 0; i--) {
                if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                } else if(this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                    moves.push(new Move(index, i * BOARD_FILES + file));
                    break;
                } else {
                    break;
                }
            }

            for (let i = file + 1; i < BOARD_FILES; i++) {
                if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                } else if(this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                    break;
                } else {
                    break;
                }
            }

            for (let i = file - 1; i >= 0; i--) {
                if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                } else if(this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                    moves.push(new Move(index, rank * BOARD_FILES + i));
                    break;
                } else {
                    break;
                }
            }
            return moves;
        }
        throw "Not a chariot at index " + index;
    }

    private cannonMoves(index: number): Move[] {
        let moves: Move[] = [];
        let rank = Math.floor(index / BOARD_FILES);
        let file = index % BOARD_FILES;
        let first_seen = false;
        if (this.colors[index] == COLOR.RED) {
            first_seen = false;
            for (let i = rank + 1; i < BOARD_RANKS; i++) {
                if (!first_seen) {
                    if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                        break;
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * BOARD_FILES + file] == COLOR.RED){
                        break;
                    }
                }
                
            }

            first_seen = false;
            for (let i = rank - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                        break;
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * BOARD_FILES + file] == COLOR.RED){
                        break;
                    }
                }
                
            }

            first_seen = false;
            for (let i = file + 1; i < BOARD_FILES; i++) {
                if (!first_seen) {
                    if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK
                        || this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                        break;
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.SENTINEL ||
                        this.colors[rank * BOARD_FILES + i] == COLOR.RED){
                        break;
                    }
                }
                
            }

            first_seen = false;
            for (let i = file - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK
                        || this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                        break;
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.SENTINEL ||
                        this.colors[rank * BOARD_FILES + i] == COLOR.RED){
                        break;
                    }
                }
                
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            first_seen = false;
            for (let i = rank + 1; i < BOARD_RANKS; i++) {
                if (!first_seen) {
                    if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                        break;
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * BOARD_FILES + file] == COLOR.BLACK){
                        break;
                    }
                }
                
            }

            first_seen = false;
            for (let i = rank - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[i * BOARD_FILES + file] == COLOR.EMPTY) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.BLACK
                        || this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[i * BOARD_FILES + file] == COLOR.RED) {
                        moves.push(new Move(index, i * BOARD_FILES + file));
                        break;
                    } else if(this.colors[i * BOARD_FILES + file] == COLOR.SENTINEL ||
                        this.colors[i * BOARD_FILES + file] == COLOR.BLACK){
                        break;
                    }
                }
                
            }

            first_seen = false;
            for (let i = file + 1; i < BOARD_FILES; i++) {
                if (!first_seen) {
                    if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK
                        || this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                        break;
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.SENTINEL ||
                        this.colors[rank * BOARD_FILES + i] == COLOR.BLACK){
                        break;
                    }
                }
                
            }

            first_seen = false;
            for (let i = file - 1; i >= 0; i--) {
                if (!first_seen) {
                    if (this.colors[rank * BOARD_FILES + i] == COLOR.EMPTY) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.BLACK
                        || this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                        first_seen = true;
                    } else {
                        break;
                    }
                } else {
                    if(this.colors[rank * BOARD_FILES + i] == COLOR.RED) {
                        moves.push(new Move(index, rank * BOARD_FILES + i));
                        break;
                    } else if(this.colors[rank * BOARD_FILES + i] == COLOR.SENTINEL ||
                        this.colors[rank * BOARD_FILES + i] == COLOR.BLACK){
                        break;
                    }
                }
                
            }
            return moves;
        }
        throw "Not a cannon at index " + index;
    }

    

    private pinChecker(moves: Move[], pinner: number) {
        //Do all the legality checking on the list
        //Bascically, check if the pinner can attack the general
        //after a move
    }

    private absolutePins() {
     //Checks for absolute pins, by checking LOS of general and the 
     //pinning pieces, which are horses, chariots, and cannons and generals LOS   
     //Idea: just get the list of pinned pieces and their pinners.
     //For those pieces, do legality testing on their generated moves
    }

    //Returns the pinned piece index, with -1 returned if no pin
    private absoluteChariotPins(pinner: number): number {
        let pinnerFile = pinner % BOARD_FILES;
        let pinnerRank = Math.floor(pinner / BOARD_FILES);
        let c = this.colors[pinner];
        let generalFile;
        let generalRank;
        let general;
        if (c == COLOR.RED) {
            generalFile = this.blackGenerals[0] % BOARD_FILES;
            generalRank = Math.floor(this.blackGenerals[0] / BOARD_FILES);
            general = this.blackGenerals[0];
        } else if (c == COLOR.BLACK){
            generalFile = this.redGenerals[0] % BOARD_FILES;
            generalRank = Math.floor(this.redGenerals[0] / BOARD_FILES);
            general = this.redGenerals[0];
        } else {
            throw "No Chariot at " + pinner;
        }
        
        let count = 0;
        let returnIndex = -1;
        if (pinnerFile == generalFile) {
            if (pinnerRank < generalRank) {
                for (let i = pinnerRank + 1; i < generalRank; i++) {
                    let index = i * BOARD_FILES + pinnerFile;
                    if (this.colors[index] == this.colors[general]) {
                        count++;
                        returnIndex = index;
                    } 

                    if (count >= 2) {
                        return -1;
                    } else if (this.colors[index] == this.colors[pinner]) {
                        return -1
                    }
                }
            } else {
                for (let i = pinnerRank - 1; i > generalRank; i--) {
                    let index = i * BOARD_FILES + pinnerFile;
                    if (this.colors[index] == this.colors[general]) {
                        count++;
                        returnIndex = index;
                    } 

                    if (count >= 2) {
                        return -1;
                    } else if (this.colors[index] == this.colors[pinner]) {
                        return -1
                    }
                }
            }
            return returnIndex;
        } else if (pinnerRank == generalRank){ 
            if (pinnerFile < generalFile) {
                for (let i = pinnerFile + 1; i < generalFile; i++) {
                    let index = pinnerRank * BOARD_FILES + i;
                    if (this.colors[index] == this.colors[general]) {
                        count++;
                        returnIndex = index;
                    } 

                    if (count >= 2) {
                        return -1;
                    } else if (this.colors[index] == this.colors[pinner]) {
                        return -1
                    }
                }
            } else {
                for (let i = pinnerFile - 1; i > generalFile; i--) {
                    let index = pinnerRank * BOARD_FILES + i;
                    if (this.colors[index] == this.colors[general]) {
                        count++;
                        returnIndex = index;
                    } 

                    if (count >= 2) {
                        return -1;
                    } else if (this.colors[index] == this.colors[pinner]) {
                        return -1
                    }
                }
            }
            return returnIndex;
        } else {
            return -1;
        }

    }

    private checkEvasion() {
        //is your general in check?
        //Does a very quick search and checks moves that
        //block general, and moves that the general can
        //make
        //If null, then checkmate and game is won by
        //side doing checking.
        //Stalemate is handled by the movegenerator.
    }

    //TODO: Needs absolute pin and check and general LOS checking
    public generateMoves(c: COLOR): Move[] {
        var moves: Move[] = [];
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
        } else if (c == COLOR.BLACK) {
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

    public makeMove(m: Move): void {
        //Check the state of the game and stuff and evolve the board
    }

    //Make a new board 
    public copy(): Board {
        return new Board();
    }

    

    //Safely gets the index in a certain direction without wrapping
    private get_ind(index: number, steps: number, dir: DIR): number {
        let rank = Math.floor(index / BOARD_FILES);
        let file = index % BOARD_FILES;
        switch(dir) {
            case DIR.E:
                if (file - steps > 0) {
                    return rank * BOARD_FILES + file - steps;
                }
                return -1;
                break;
            case DIR.NE:
                let limit1 = Math.min(file, BOARD_RANKS - 1 - rank);
                if (steps <= limit1) {
                    return index + (BOARD_FILES - 1) * steps;
                }
                return -1;
                break;
            case DIR.N:
                if (rank + steps < BOARD_RANKS) {
                    return (rank + steps) * BOARD_FILES + file;
                }
                return -1;
                break;
            case DIR.NW:
                let limit2 = Math.min(BOARD_FILES - 1 -file, BOARD_RANKS - 1 - rank);
                if (steps <= limit2) {
                    return index + (BOARD_FILES + 1) * steps;
                }
                return -1;
                break;
            case DIR.W:
                if (file + steps < BOARD_FILES) {
                    return rank * BOARD_FILES + file + steps;
                }
                return -1;
                break;
            case DIR.SW:
                let limit3 = Math.min(BOARD_FILES - 1 -file, rank);
                if (steps <= limit3) {
                    return index - (BOARD_FILES - 1) * steps;
                }
                return -1;
                break;
            case DIR.S:
                if (rank - steps > 0) {
                    return (rank - steps) * BOARD_FILES + file;
                }
                return -1;
                break;
            case DIR.SE:
                let limit4 = Math.min(file, rank);
                if (steps <= limit4) {
                    return index - (BOARD_FILES + 1) * steps;
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
    private get(index: number, steps: number, dir: DIR): COLOR {
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
    public isValid(): boolean {
        for (let i = 0; i < BOARD_FILES * BOARD_RANKS; i++) {
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

    public isEqual(other: Board): boolean {
        for (let i = 0; i < BOARD_FILES * BOARD_RANKS; i++) {
            if(this.colors[i] != other.colors[i] || this.pieces[i] != other.pieces[i]) {
                return false;
            } 
        }
        return true;
    }

    public setColor(f: number, r:number, color: COLOR): void {
        this.colors[r * BOARD_FILES + f] = color;
    }

    public setPiece(f: number, r:number, piece: PIECE): void {
        this.pieces[r* BOARD_FILES + f] = piece;
    }

    public getColor(f: number, r: number): COLOR {
        return this.colors[r * BOARD_FILES + f];
    }

    public getPiece(f: number, r: number): PIECE {
        return this.pieces[r * BOARD_FILES + f];
    }
    
    /**
     * Appropriately add a piece, updating the board
     * WILL OVERWRITE PIECE ORIGINALLY THERE
     */
    public add(c: COLOR, p: PIECE, f: number, r: number): void {
        //TODO add error checking for out of bounds f and r 
        if (c == COLOR.RED) {
            let index = r * BOARD_FILES + f;
            this.colors[index] = c;
            this.pieces[index] = p;
            switch (p) {
                case PIECE.PAWN:
                    this.redPawns.push(index);
                    break;
                case PIECE.GENERAL:
                    this.redGenerals.push(index);
                    break;
                case PIECE.ADVISOR:
                    this.redAdvisors.push(index);
                    break;
                case PIECE.ELEPHANT:
                    this.redElephants.push(index);
                    break;
                case PIECE.HORSE:
                    this.redHorses.push(index);
                    break;
                case PIECE.CHARIOT:
                    this.redChariots.push(index);
                    break;
                case PIECE.CANNON:
                    this.redCannons.push(index);
                    break;
                default:
                    throw "Piece was invalid";
            }
            return;
        } else if (c == COLOR.BLACK) {
            let index = r * BOARD_FILES + f;
            this.colors[index] = c;
            this.pieces[index] = p;
            switch (p) {
                case PIECE.PAWN:
                    this.blackPawns.push(index);
                    break;
                case PIECE.GENERAL:
                    this.blackGenerals.push(index);
                    break;
                case PIECE.ADVISOR:
                    this.blackAdvisors.push(index);
                    break;
                case PIECE.ELEPHANT:
                    this.blackElephants.push(index);
                    break;
                case PIECE.HORSE:
                    this.blackHorses.push(index);
                    break;
                case PIECE.CHARIOT:
                    this.blackChariots.push(index);
                    break;
                case PIECE.CANNON:
                    this.blackCannons.push(index);
                    break;
                default:
                    throw "Piece was invalid";
            }
            return;
        }
        throw "Color is invalid";
    }

    /* TODO
    public copy(): Board {

    }*/

    
};

//From red's perspective always
/**  3 2 1
 *   4   0
 *   5 6 7
 */
export enum DIR {
    E,
    NE,
    N,
    NW,
    W,
    SW,
    S,
    SE,
};

export class Move {
    public initial: number;
    public final: number;

    public constructor(initial: number, final: number) {
        this.initial = initial;
        this.final = final;
    }

    public isEqual(other: Move): boolean {
        return this.initial == other.initial && this.final == other.final;
    }
};


//xiangqi.js + xiangqijs for board and game logic, I want to go to modeling and machine learning and AI