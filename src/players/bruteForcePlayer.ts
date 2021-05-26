import { Board, COLOR, PIECE } from "../game/board";
import { MachinePlayer } from "./machinePlayer";

export const name = 'BruteForcePlayer'; 

const PIECE_VALUE_TABLE: {[piece: number]: number} = {
    1: 6000,
    2: 120,
    3: 120,
    4: 270,
    5: 600,
    6: 285,
    7: 30,
}


const B_CHARIOT_POSITION: number[] = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 14, 14, 12, 18, 16, 18, 12, 14, 14, -1,
    -1, 16, 20, 18, 24, 26, 24, 18, 20, 16, -1,
    -1, 12, 12, 12, 18, 18, 18, 12, 12, 12, -1,
    -1, 12, 18, 16, 22, 22, 22, 16, 18, 12, -1,
    -1, 12, 14, 12, 18, 18, 18, 12, 14, 12, -1,
    -1, 12, 16, 14, 20, 20, 20, 14, 16, 12, -1,
    -1, 6, 10, 8, 14, 14, 14, 8, 10, 6, -1,
    -1, 4, 8, 6, 14, 12, 14, 6, 8, 4, -1,
    -1, 8, 4, 8, 16, 8, 16, 8, 4, 8, -1,
    -1, -2, 10, 6, 14, 12, 14, 6, 10, -2, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];

const B_HORSE_POSITION: number[] = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 4, 8, 16, 12, 14, 12, 16, 8, 4, -1,
    -1, 4, 10, 28, 16, 18, 16, 28, 10, 4, -1,
    -1, 12, 14, 16, 20, 18, 20, 16, 14, 12, -1,
    -1, 8, 24, 18, 24, 20, 24, 18, 24, 8, -1,
    -1, 6, 16, 14, 18, 16, 18, 14, 16, 6, -1,
    -1, 4, 12, 16, 14, 12, 14, 16, 12, 4, -1,
    -1, 2, 6, 8, 6, 10, 6, 8, 6, 2, -1,
    -1, 4, 2, 8, 8, 4, 8, 8, 2, 4, -1,
    -1, 0, 2, 4, 4, -2, 4, 4, 2, 0, -1,
    -1, 0, -4, 0, 0, 0, 0, 0, -4, 0, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];

const B_CANNON_POSITION: number[] = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 6, 4, 0, -10, -12, -10, 0, 4, 6, -1,
    -1, 2, 2, 0, -4, -14, -4, 0, 2, 2, -1,
    -1, 2, 2, 0, -10, -8, -10, 0, 2, 2, -1,
    -1, 0, 0, -2, 4, 10, 4, -2, 0, 0, -1,
    -1, 0, 0, 0, 2, 8, 2, 0, 0, 0, -1,
    -1, -2, 0, 4, 2, 6, 2, 4, 0, -2, -1,
    -1, 0, 0, 0, 2, 4, 2, 0, 0, 0, -1,
    -1, 4, 0, 8, 6, 10, 6, 8, 0, 4, -1,
    -1, 0, 2, 4, 6, 6, 6, 4, 2, 0, -1,
    -1, 0, 0, 2, 6, 6, 6, 2, 0, 0, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];

const B_PAWN_POSITION: number[] = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 0, 3, 6, 9, 12, 9, 6, 3, 0, -1,
    -1, 18, 36, 56, 80, 120, 80, 56, 36, 18, -1,
    -1, 14, 26, 42, 60, 80, 60, 42, 26, 14, -1,
    -1, 10, 20, 30, 34, 40, 34, 30, 20, 10, -1,
    -1, 6, 12, 18, 18, 20, 18, 18, 12, 6, -1,
    -1, 2, 0, 8, 0, 8, 0, 8, 0, 2, -1,
    -1, 0, 0, -2, 0, 4, 0, -2, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];

const R_CHARIOT_POSITION: number[] = ((): number[] => {
    let table: number[] = []
    for (let i = 0; i < B_CHARIOT_POSITION.length; i++) {
        table.push(B_CHARIOT_POSITION[B_CHARIOT_POSITION.length - 1 - i]);
    }
    return table;
})();

const R_HORSE_POSITION: number[] = ((): number[] => {
    let table: number[] = []
    for (let i = 0; i < B_HORSE_POSITION.length; i++) {
        table.push(B_HORSE_POSITION[B_HORSE_POSITION.length - 1 - i]);
    }
    return table;
})();

const R_CANNON_POSITION: number[] = ((): number[] => {
    let table: number[] = []
    for (let i = 0; i < B_CANNON_POSITION.length; i++) {
        table.push(B_CANNON_POSITION[B_CANNON_POSITION.length - 1 - i]);
    }
    return table;
})();

const R_PAWN_POSITION: number[] = ((): number[] => {
    let table: number[] = []
    for (let i = 0; i < B_PAWN_POSITION.length; i++) {
        table.push(B_PAWN_POSITION[B_PAWN_POSITION.length - 1 - i]);
    }
    return table;
})();

const PIECE_TABLES: {[color: number]: {[piece: number]: number[]}} = {
    1: {
        4: R_HORSE_POSITION,
        5: R_CHARIOT_POSITION,
        6: R_CANNON_POSITION,
        7: R_PAWN_POSITION
    },
    2: {
        4: B_HORSE_POSITION,
        5: B_CHARIOT_POSITION,
        6: B_CANNON_POSITION,
        7: B_PAWN_POSITION
    }
}

const ALPHA_0 = 120 * 16 + 8940;
const BETA_0 = -ALPHA_0;
//Implementation of the alpha beta pruning stuff
//Do alpha beta move reordering too
//And general testing of AI stuff
//Opening books
//Value boards
//Programmable opening (will stop following if other player moves out of sequence)
export class BruteForcePlayer extends MachinePlayer {
    private evaluate(b: Board): number {
        let score = 0;

        //Material count
        for (let i = COLOR.RED; i <= COLOR.BLACK; i++) {
            for (let j = PIECE.GENERAL; j <= PIECE.PAWN; j++) {
                if (i == COLOR.BLACK) {
                    score -= b.dict[i][j].length * PIECE_VALUE_TABLE[j];
                } else {
                    score += b.dict[i][j].length * PIECE_VALUE_TABLE[j];
                }
                
                
            }
        }

        //Positional eval
        for (let i = COLOR.RED; i <= COLOR.BLACK; i++) {
            for (let j = PIECE.HORSE; j <= PIECE.PAWN; j++) {
                for (let k = 0; k < b.dict[i][j].length; k++) {
                    if(i == COLOR.BLACK) {
                        score -= PIECE_TABLES[i][j][b.dict[i][j][k]];
                    } else {
                        score += PIECE_TABLES[i][j][b.dict[i][j][k]];
                    }
                }
                
            }
        }

        return score;
    }

    private search(b: Board, alpha: number, beta: number, c: COLOR): number {
        for (let i = 0; i < b.legalMoves(c).length; i++) {
            //
        }
        return 0;
    }
}