import { BOARD_FILES, BOARD_RANKS, COLOR, PIECE, FILES } from "./src/game/board";
import { Game } from "./src/game/game";
import { humanPlayer } from "./src/players/humanPlayer";
import { Player } from "./src/players/player";

var jquery = require('jquery');
var bootstrap = require('bootstrap');
//Basically, we need an html 
//which we manipulate the DOM for the GUI

//TODO: timer, UI, engine output/thinking or something, highlighting/sounds, buttons and functionalities

const pieces = 'static/pieces/';

const WIDTH = 46//45;
const HEIGHT = 48//47.5;
const PIECE_WIDTH = 42//42;

const BUFFER_HEIGHT = 48//42.5;



function drawBoard(): void {
    var boardTable = '<table cellspacing=0><tbody>';
    
    let board = g.getBoard;
    for (let r = 1; r < BOARD_RANKS - 1; r++) {
        boardTable += '<tr>';
        for (let f = 1; f <= FILES; f++) {
            if (flip) {
                f = 10 - f;
                r = BOARD_RANKS - 1 - r;
            }

            let index = r * BOARD_FILES + f;
            
            let c = board.getColor(f, r);
            
            let pieceImg: string = '';
            if (c != COLOR.SENTINEL && c != COLOR.EMPTY) {
                pieceImg = '<img style="width:' + PIECE_WIDTH +'px" draggable="true" ';
                pieceImg += 'src="' + pieces + pieceSVG(board.getColor(f, r), board.getPiece(f, r)) +'"></img>';
                console.log(pieceImg);
            }
            boardTable += 
                '<td align="center" id="' + index + 
                '" height="' + (c == COLOR.SENTINEL ? BUFFER_HEIGHT : HEIGHT) + 'px" width="' + 
                WIDTH + 'px" ' +
                'onclick="tapPiece(this.id)" ' +
                'ondragstart="dragPiece(event, this.id)" ' +
                'ondragover="dragOver(event, this.id)" ' +
                'ondrop="dropPiece(event, this.id)">';

            if (c == COLOR.EMPTY || c == COLOR.SENTINEL) {
                boardTable += '<td>';
            } else {
                boardTable += pieceImg;
                boardTable += '<td>';
            }
            //we're using data cells to make the board
            //Add code to make svg pieces. This basically
            //Creates a big board where the background is the board svg
            //So research bootstrap squares and stuff I guess
            //draggable allows the square divs the pieces are on move
            if (flip) {
                f = 10 - f;
                r = BOARD_RANKS - 1 - r;
            }
        }
        boardTable += '</tr>';
    }
    boardTable += '</tbody></table>';
    document.getElementById('board')!.innerHTML = boardTable;
    
}

function highlight() {

}

function playSounds() {

}

//All the UI functions 
//And the API calls necessary for it to work.
//Be careful to disallow droppin over sentinel cells


function makeGame(redPlayer: Player = new humanPlayer(), blackPlayer: Player = new humanPlayer(),
    redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10): Game {
    return new Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
}

function pieceSVG(c: COLOR, p: PIECE): string {
    let str = '';
    if (c == COLOR.RED) {
        str += 'red_';
    } else {
        str += 'black_';
    }
    switch(p) {
        case PIECE.PAWN:
            str += 'pawn';
            break;
        case PIECE.GENERAL:
            str += 'general';
            break;
        case PIECE.ADVISOR:
            str += 'advisor';
            break;
        case PIECE.ELEPHANT:
            str += 'elephant';
            break;
        case PIECE.HORSE:
            str += 'horse';
            break;
        case PIECE.CHARIOT:
            str += 'chariot';
            break;
        case PIECE.CANNON:
            str += 'cannon';
            break;
        default:
            throw 'invalid piece to make into SVG';
    }
    str += '.svg';
    return str;
}

var g: Game = makeGame();

var flip: boolean = true;

drawBoard();