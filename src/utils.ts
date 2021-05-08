import { Board, COLOR, Move, PIECE } from "./game/board";

export const name = 'utils';

//Pawn notation is still unknown
//Pawn notation is complex. If you have doubled or lined up file pawns
// pawns, you replace the P with the file its on and its order, 1 being the frontmost
//Thus 61+1 means pawn on the 6th file closest to the opposite side

//Advisor/Elephant notation when doubled needs no +-

const expr: RegExp = new RegExp('^(([GAEHRCPgaehrcp][1-9])|([+-][HRChrc])|([1-9][1-5])[=+-]([0-9]|1[0]))$');

export function commandToMove(input: string, c: COLOR, board: Board): Move {
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
    } else if (piece.substring(0, 1) === '-') {
        sameFile = true;
        advanced = false;
        p = piece.substring(1, 2);
    } else {
        p = piece.substring(0, 1);
    }
    //Check for files and stuff
    //Filter the appropriate pieces when using special notation
    switch(p) {
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
    

}

export function moveToCommand(move: Move, c: COLOR, board: Board): string {

}