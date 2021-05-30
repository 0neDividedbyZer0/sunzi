export const name = 'board'

//TODO: 3 move check-chase, 3 move repetition draw

/**
 * The board's absolute position is based on
 * red's orientation. Files are numbered 
 * right to left, from 1-9, ranks are numbered
 * down to up. The perspective is from red, so
 * the right-corner in red is F:1 R:1
 * (In implementation, they are labeled from 0)
 */

export const FILES: number = 9;
export const RANKS: number = 10;

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

    //Even moves are red, odd is black
    public move_history: Move[] = [];
    public board_history: Board[] = [];
    private turnNum: number = -1;
    private curr_moves: Move[] = [];
    public dict: {[color: number]: {[piece: number]: number[]}} = {};

    public static startBoard(): Board {
        let b = new Board();
        b.colors = Array.from(START_BOARD_C);
        b.pieces = Array.from(START_BOARD_P);

        b.redGenerals = Array.from(RED_GENERALS);
        b.redAdvisors = Array.from(RED_ADVISORS);
        b.redElephants = Array.from(RED_ELEPHANTS);
        b.redHorses = Array.from(RED_HORSES);
        b.redChariots = Array.from(RED_CHARIOTS);
        b.redCannons = Array.from(RED_CANNONS);
        b.redPawns = Array.from(RED_PAWNS);

        b.blackGenerals = Array.from(BLACK_GENERALS);
        b.blackAdvisors = Array.from(BLACK_ADVISORS);
        b.blackElephants = Array.from(BLACK_ELEPHANTS);
        b.blackHorses = Array.from(BLACK_HORSES);
        b.blackChariots = Array.from(BLACK_CHARIOTS);
        b.blackCannons = Array.from(BLACK_CANNONS);
        b.blackPawns = Array.from(BLACK_PAWNS);

        b.dict[COLOR.RED][PIECE.GENERAL] = b.redGenerals;
        b.dict[COLOR.RED][PIECE.ADVISOR] = b.redAdvisors;
        b.dict[COLOR.RED][PIECE.ELEPHANT] = b.redElephants;
        b.dict[COLOR.RED][PIECE.HORSE] = b.redHorses;
        b.dict[COLOR.RED][PIECE.CHARIOT] = b.redChariots;
        b.dict[COLOR.RED][PIECE.CANNON] = b.redCannons;
        b.dict[COLOR.RED][PIECE.PAWN] = b.redPawns;

        b.dict[COLOR.BLACK][PIECE.GENERAL] = b.blackGenerals;
        b.dict[COLOR.BLACK][PIECE.ADVISOR] = b.blackAdvisors;
        b.dict[COLOR.BLACK][PIECE.ELEPHANT] = b.blackElephants;
        b.dict[COLOR.BLACK][PIECE.HORSE] = b.blackHorses;
        b.dict[COLOR.BLACK][PIECE.CHARIOT] = b.blackChariots;
        b.dict[COLOR.BLACK][PIECE.CANNON] = b.blackCannons;
        b.dict[COLOR.BLACK][PIECE.PAWN] = b.blackPawns;

        return b;
    }
    
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

        this.dict = {
            1: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
            },
            2: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
            }
        }
    
        this.dict[COLOR.RED][PIECE.GENERAL] = this.redGenerals;
        this.dict[COLOR.RED][PIECE.ADVISOR] = this.redAdvisors;
        this.dict[COLOR.RED][PIECE.ELEPHANT] = this.redElephants;
        this.dict[COLOR.RED][PIECE.HORSE] = this.redHorses;
        this.dict[COLOR.RED][PIECE.CHARIOT] = this.redChariots;
        this.dict[COLOR.RED][PIECE.CANNON] = this.redCannons;
        this.dict[COLOR.RED][PIECE.PAWN] = this.redPawns;

        this.dict[COLOR.BLACK][PIECE.GENERAL] = this.blackGenerals;
        this.dict[COLOR.BLACK][PIECE.ADVISOR] = this.blackAdvisors;
        this.dict[COLOR.BLACK][PIECE.ELEPHANT] = this.blackElephants;
        this.dict[COLOR.BLACK][PIECE.HORSE] = this.blackHorses;
        this.dict[COLOR.BLACK][PIECE.CHARIOT] = this.blackChariots;
        this.dict[COLOR.BLACK][PIECE.CANNON] = this.blackCannons;
        this.dict[COLOR.BLACK][PIECE.PAWN] = this.blackPawns;


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

    //Generate moves for the piece at INDEX
    public moves(index: number): Move[] {
        let p = this.pieces[index];
        switch(p) {
            case PIECE.GENERAL:
                return this.generalMoves(index);
            case PIECE.ADVISOR:
                return this.advisorMoves(index);
            case PIECE.ELEPHANT:
                return this.elephantMoves(index);
            case PIECE.HORSE:
                return this.horseMoves(index);
            case PIECE.CHARIOT:
                return this.chariotMoves(index);
            case PIECE.CANNON:
                return this.cannonMoves(index);
            case PIECE.PAWN:
                return this.pawnMoves(index);
            default:
                return [];
        }
    }

    public generateMoves(c: COLOR): Move[] {
        var moves: Move[] = [];
        for (let i: number = PIECE.GENERAL; i <= PIECE.PAWN; i++) {
            this.dict[c][i].forEach(p => {
                moves = moves.concat(this.moves(p));
            })
        }

        moves.forEach(m => {
            m.captured = this.pieces[m.final];
        });
        return moves;
    }

    private removePiece(c: COLOR, p: PIECE, final: number): void {
        let index;
        this.colors[final] = COLOR.EMPTY;
        this.pieces[final] = PIECE.EMPTY;
        index = this.dict[c][p].indexOf(final);
        this.dict[c][p].splice(index, 1);
    }

    //Check flying general
    public legalMoves(c: COLOR): Move[] {
        //If turnNum is equal, then it won't calculate
        //if (this.turnNum != this.move_history.length) {
        this.curr_moves = [];
        let moves = this.generateMoves(c);
        moves.forEach(m => {
            if (!this.generalAttacked(m)) {
                this.curr_moves.push(m);
            }
        });
        this.turnNum = this.move_history.length;
        //}
        return this.curr_moves;
    }

    //Make move without checking legality
    //Need to keep move history
    //Need to change move to distinguish between captures and remember
    //what was captured
    public makeMove(m: Move): void {
        this.move_history.push(m);
        this.board_history.push(this.copy());
        let p = this.pieces[m.final];
        let c = this.colors[m.final];
        if (m.isCapture()) {
            this.removePiece(c, p, m.final);
        }
        p = this.pieces[m.initial];
        c = this.colors[m.initial];
        this.removePiece(c, p, m.initial);
        let r = Math.floor(m.final / BOARD_FILES);
        let f = m.final % BOARD_FILES; 
        this.add(c, p, f, r)
    }

    //Some bug is in undomove or something
    public undoMove(): void {
        let m = this.move_history.pop();
        if (m === undefined) {
            throw "move history empty";
        }
        let b = this.board_history.pop();
        if (b === undefined) {
            throw "board history empty";
        }
        let p = this.pieces[m.final];
        let c = this.colors[m.final];
        this.removePiece(c, p, m.final);
        let r = Math.floor(m.initial / BOARD_FILES);
        let f = m.initial % BOARD_FILES; 
        this.add(c, p, f, r)
        if (m.isCapture()) {
            if (c == COLOR.RED) {
                c = COLOR.BLACK;
            } else {
                c = COLOR.RED;
            }
            p = m.captured;
            r = Math.floor(m.final / BOARD_FILES);
            f = m.final % BOARD_FILES; 
            this.add(c, p, f, r);
            
        } 
    }

    private generalAttacked(move: Move): boolean {
        this.makeMove(move);
        var isAttacked = false;
        let flying_general = true;
        let r_index = this.redGenerals[0];
        let b_index = this.blackGenerals[0];
        if (r_index % BOARD_FILES == b_index % BOARD_FILES) {
            let start_r = Math.floor(r_index / BOARD_FILES);
            let end_r = Math.floor(b_index / BOARD_FILES);
            let start_f = r_index % BOARD_FILES;
            for (let i = start_r + 1; i < end_r; i++) {
                if (this.pieces[i * BOARD_FILES + start_f] != PIECE.EMPTY) {
                    flying_general = false;
                    break;
                }
            }
            if (flying_general) {
                this.undoMove();
                return true;
            }
        }
        let c;
        if (this.move_history.length % 2 == 0) {
            c = COLOR.RED;
        } else {
            c = COLOR.BLACK;
        }
        let moves = this.generateMoves(c);
        
        moves.forEach(m => {
            if(m.isCapture()) {
                if (m.captured == PIECE.GENERAL) {
                    isAttacked = true;
                    return;
                }
            }
        });
        this.undoMove();
        return isAttacked;
    }

    public isMated(c: COLOR): boolean { 
        let moves = this.legalMoves(c);
        return moves.length == 0;
    }

    public repeated(): boolean {
        if (this.board_history.length < 9) {
            return false;
        } else {
            let index = this.board_history.length - 1;
            if (this.board_history[index].comparator(this.board_history[index - 4]) == 0
                && this.board_history[index - 4].comparator(this.board_history[index - 8]) == 0) {
                return true;
            }
            return false;
        }
    }

    private static indexToVal(input: number[]): number {
        if (input.length == 2) {
            return Math.min(1000 * input[0] + input[1], 1000 * input[1] + input[0]);
        } else if (input.length == 1) {
            return input[0];
        } else {
            return 0;
        }
    }

    // If this > other => +, this < other => -, else 0
    /* 
        Lexicographic order
    */
    public comparator(other: Board): number {
        //For each color and piece, we create a number
        //If there are two pieces, do smaller * 1000 + larger, 
        //If there is 1 piece, do that piece
        //If there is no piece, do 0, should create a sequence of 14 numbers.
        //Compare in lexicographic order
        for (let i: number = COLOR.RED; i <= COLOR.BLACK; i++) {
            for (let j: number = PIECE.GENERAL; j <= PIECE.PAWN; j++) {
                let left = Board.indexToVal(this.dict[i][j]);
                let right = Board.indexToVal(other.dict[i][j]);
                if (left < right) {
                    return -1;
                } else if (left > right) {
                    return 1;
                }
            }
        }
        return 0;
    }


    //Make a new board 
    public copy(): Board {
        let b = new Board();
        b.colors = Array.from(this.colors);
        b.pieces = Array.from(this.pieces);

        b.redGenerals = Array.from(this.redGenerals);
        b.redAdvisors = Array.from(this.redAdvisors);
        b.redElephants = Array.from(this.redElephants);
        b.redHorses = Array.from(this.redHorses);
        b.redChariots = Array.from(this.redChariots);
        b.redCannons = Array.from(this.redCannons);
        b.redPawns = Array.from(this.redPawns);

        b.blackGenerals = Array.from(this.blackGenerals);
        b.blackAdvisors = Array.from(this.blackAdvisors);
        b.blackElephants = Array.from(this.blackElephants);
        b.blackHorses = Array.from(this.blackHorses);
        b.blackChariots = Array.from(this.blackChariots);
        b.blackCannons = Array.from(this.blackCannons);
        b.blackPawns = Array.from(this.blackPawns);

        b.move_history = Array.from(this.move_history);

        b.dict[COLOR.RED][PIECE.GENERAL] = b.redGenerals;
        b.dict[COLOR.RED][PIECE.ADVISOR] = b.redAdvisors;
        b.dict[COLOR.RED][PIECE.ELEPHANT] = b.redElephants;
        b.dict[COLOR.RED][PIECE.HORSE] = b.redHorses;
        b.dict[COLOR.RED][PIECE.CHARIOT] = b.redChariots;
        b.dict[COLOR.RED][PIECE.CANNON] = b.redCannons;
        b.dict[COLOR.RED][PIECE.PAWN] = b.redPawns;

        b.dict[COLOR.BLACK][PIECE.GENERAL] = b.blackGenerals;
        b.dict[COLOR.BLACK][PIECE.ADVISOR] = b.blackAdvisors;
        b.dict[COLOR.BLACK][PIECE.ELEPHANT] = b.blackElephants;
        b.dict[COLOR.BLACK][PIECE.HORSE] = b.blackHorses;
        b.dict[COLOR.BLACK][PIECE.CHARIOT] = b.blackChariots;
        b.dict[COLOR.BLACK][PIECE.CANNON] = b.blackCannons;
        b.dict[COLOR.BLACK][PIECE.PAWN] = b.blackPawns;

        return b;
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
        let index = r * BOARD_FILES + f;
        this.colors[index] = c;
        this.pieces[index] = p;
        this.dict[c][p].push(index);
    }

    public toString(): string {
        let out = '';
        for (let i = 0; i < RANKS; i++) {
            out = '\n' + out;
            for (let j = 1; j <= FILES; j++) {
                if (this.pieces[(i+2) * BOARD_FILES + j] == PIECE.EMPTY) {
                    out = '. ' + out;
                } else {
                    let p;
                    switch(this.pieces[(i+2) * BOARD_FILES + j]) {
                        case PIECE.PAWN:
                            p = 'p';
                            break;
                        case PIECE.GENERAL:
                            p = 'g';
                            break;
                        case PIECE.ADVISOR:
                            p = 'a';
                            break;
                        case PIECE.ELEPHANT:
                            p = 'e';
                            break;
                        case PIECE.HORSE:
                            p = 'h';
                            break;
                        case PIECE.CHARIOT:
                            p = 'r';
                            break;
                        case PIECE.CANNON:
                            p = 'c';
                            break;
                        default:
                            throw 'invalid piece to stringify';
                    }
                    if (this.colors[(i+2) * BOARD_FILES + j] == COLOR.RED) {
                        p = p.toUpperCase();
                    }
                    out = p + ' ' + out;
                }
            }
        }
        out = out + '\n';
        return out;
    }
    
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
    public captured: PIECE = PIECE.EMPTY; 

    public constructor(initial: number, final: number) {
        this.initial = initial;
        this.final = final;
    }

    public isEqual(other: Move): boolean {
       return this.initial == other.initial && this.final == other.final;
    }

    public isCapture(): boolean {
        return this.captured != PIECE.EMPTY && this.captured != PIECE.SENTINEL;
    }

    public toString(): string {
        return `${this.initial}->${this.final}`;
    }

    
};