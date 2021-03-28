export const name = 'board'

//11x13 board with two sentinel rows and files. Piece lists
//Two boards, one with colors, the other with piece types.
//Deal with horses leaping offbound on the edges with wraparound

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

const BOARD_FILES: number = 11;
const BOARD_RANKS: number = 14;

const RED_GENERAL_PALACE: number[] = [4, 5, 6, 15, 16, 17, 26, 27, 28];
const BLACK_GENERAL_PALACE: number[] = [125, 126, 127, 136, 137, 138, 147, 148, 149];

const RED_ELEPHANT_INDICES: number[] = [3, 7, 23, 27, 31, 47, 51 ];
const BLACK_ELEPHANT_INDICES: number[] = [102, 106, 122, 126, 130, 146, 150];

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
    private colors: COLOR[];
    private pieces: PIECE[];

    private redGenerals: number[];
    private redAdvisors: number[];
    private redElephants: number[];
    private redHorses: number[];
    private redChariots: number[];
    private redCannons: number[];
    private redPawns: number[];

    private blackGenerals: number[];
    private blackAdvisors: number[];
    private blackElephants: number[];
    private blackHorses: number[];
    private blackChariots: number[];
    private blackCannons: number[];
    private blackPawns: number[];
    
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
    public pawnMoves(index: number): Move[] {
        var moves: Move[] = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.N)));
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.E)));
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.W)));
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.S)));
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.E)));
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                moves.push(new Move(index, this.get_ind(index, 1, DIR.W)));
            }
            return moves;
        } else {
            throw "There was an empty piece at " + index;
        }
    }

    public generalMoves(index: number): Move[] {
        var moves: Move[] = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.N)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.E)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.S)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.W)
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.N) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.N)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.E) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.E)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.S) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.S)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.W) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.W)
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        throw "No general at index " + index;
    }

    public advisorMoves(index: number): Move[] {
        var moves: Move[] = [];
        if (this.colors[index] == COLOR.RED) {
            if (this.get(index, 1, DIR.NE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.NE);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.NW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.NW);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.SW);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.SE);
                if (RED_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        } else if (this.colors[index] == COLOR.BLACK) {
            if (this.get(index, 1, DIR.NE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.NE);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.NW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.NW);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SW) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.SW);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            if (this.get(index, 1, DIR.SE) == COLOR.EMPTY) {
                let i = this.get_ind(index, 1, DIR.SE);
                if (BLACK_GENERAL_PALACE.includes(i)) {
                    moves.push(new Move(index, i));
                }
            }
            return moves;
        }
        throw "No advisor at index " + index;
    }

    public elephantMoves(index: number) {

    }

    public horseMoves(index: number) {

    }

    public chariotMoves(index: number) {

    }

    public cannonMoves(index: number) {

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

    /* TODO
    public copy(): Board {

    }*/
    
    //TODO direction enum

    
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
};
