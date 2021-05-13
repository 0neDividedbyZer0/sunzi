import { BOARD_FILES, BOARD_RANKS, COLOR, PIECE } from "./src/game/board";
import { Game } from "./src/game/game";
import { humanPlayer } from "./src/players/humanPlayer";
import { Player } from "./src/players/player";

var jquery = require('jquery');
var bootstrap = require('bootstrap');
//Basically, we need an html 
//which we manipulate the DOM for the GUI

function drawBoard(): void {
    let boardDiv = document.getElementById('board');
    let board = g.getBoard;
    for (let r = 0; r < BOARD_RANKS; r++) {
        for (let f = 0; f < BOARD_FILES; f++) {
            let index = r * BOARD_FILES + f;
            let pieceImg = '<img style="width: 44px" draggable="true"';
            pieceImg += 'static/pieces/' + pieceSVG(board.getColor(f, r), board.getPiece(f, r)) +'"></img>"';
            //we're using data cells to make the board
            //Add code to make svg pieces. This basically
            //Creates a big board where the background is the board svg
            //So research bootstrap squares and stuff I guess
            //draggable allows the square divs the pieces are on move
        }
    }
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