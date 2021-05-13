import { BOARD_FILES, BOARD_RANKS, COLOR, PIECE } from "./src/game/board";
import { Game } from "./src/game/game";
import { humanPlayer } from "./src/players/humanPlayer";
import { Player } from "./src/players/player";

var jquery = require('jquery');
var bootstrap = require('bootstrap');
//Basically, we need an html 
//which we manipulate the DOM for the GUI

const pieces = 'static/pieces/';

//Dimensions are all off. the Board is 900 width, 1200 height

const WIDTH = 45;
const HEIGHT = 54;



function drawBoard(): void {
    var boardTable = '<table cellspacing=0><tbody>';
    
    let board = g.getBoard;
    for (let r = 0; r < BOARD_RANKS; r++) {
        boardTable += '<tr>';
        for (let f = 0; f < BOARD_FILES; f++) {
            let index = r * BOARD_FILES + f;
            
            let c = board.getColor(f, r);
            if (c != COLOR.SENTINEL) {
                let pieceImg: string = '';
                if (c != COLOR.EMPTY) {
                    pieceImg = '<img style="width: 44px" draggable="true" ';
                    pieceImg += 'src="' + pieces + pieceSVG(board.getColor(f, r), board.getPiece(f, r)) +'"></img>';
                    console.log(pieceImg);
                }
                boardTable += 
                    '<td align="center" id="' + index + 
                    '" height="' + HEIGHT + 'px" width="' + WIDTH + 'px" ' +
                    'onclick="tapPiece(this.id)" ' +
                    'ondragstart="dragPiece(event, this.id)" ' +
                    'ondragover="dragOver(event, this.id)" ' +
                    'ondrop="dropPiece(event, this.id)">';

                if (c == COLOR.EMPTY) {
                    boardTable += '<td>';
                } else {
                    boardTable += pieceImg;
                    boardTable += '<td>';
                }
            }
            //we're using data cells to make the board
            //Add code to make svg pieces. This basically
            //Creates a big board where the background is the board svg
            //So research bootstrap squares and stuff I guess
            //draggable allows the square divs the pieces are on move
        }
        boardTable += '</tr>';
    }
    boardTable += '</tbody></table>';
    document.getElementById('board')!.innerHTML = boardTable;
    
}


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

drawBoard();