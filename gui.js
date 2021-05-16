"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("./src/game/board");
const game_1 = require("./src/game/game");
const GuiPlayer_1 = require("./src/players/GuiPlayer");
const machinePlayer_1 = require("./src/players/machinePlayer");
var jquery = require('jquery');
var bootstrap = require('bootstrap');
//Basically, we need an html 
//which we manipulate the DOM for the GUI
//TODO: timer, UI, engine output/thinking or something, highlighting/sounds, buttons and functionalities
const pieces = 'static/pieces/';
const WIDTH = 46; //45;
const HEIGHT = 48; //47.5;
const PIECE_WIDTH = 42; //42;
const BUFFER_HEIGHT = 48; //42.5;
const SELECTED_COLOR = 'brown';
function drawBoard() {
    var boardTable = '<table cellspacing=0><tbody>';
    let board = g.getBoard;
    for (let r = 1; r < board_1.BOARD_RANKS - 1; r++) {
        boardTable += '<tr>';
        for (let f = 1; f <= board_1.FILES; f++) {
            if (flip) {
                f = 10 - f;
                r = board_1.BOARD_RANKS - 1 - r;
            }
            let index = r * board_1.BOARD_FILES + f;
            let c = board.getColor(f, r);
            let pieceImg = '';
            if (c != board_1.COLOR.SENTINEL && c != board_1.COLOR.EMPTY) {
                pieceImg = '<img style="width:' + PIECE_WIDTH + 'px" draggable="true" ';
                pieceImg += 'src="' + pieces + pieceSVG(board.getColor(f, r), board.getPiece(f, r)) + '"></img>';
                console.log(pieceImg);
            }
            boardTable +=
                '<td align="center" id="' + index +
                    '" height="' + (c == board_1.COLOR.SENTINEL ? BUFFER_HEIGHT : HEIGHT) + 'px" width="' +
                    WIDTH + 'px" ' +
                    'onclick="clickPiece(this.id)" ' +
                    'ondragstart="dragPiece(event, this.id)" ' +
                    'ondragover="dragFinished(event, this.id)" ' +
                    'ondrop="dropPiece(event, this.id)">';
            if (c == board_1.COLOR.EMPTY || c == board_1.COLOR.SENTINEL) {
                boardTable += '<td>';
            }
            else {
                boardTable += pieceImg;
                boardTable += '<td>';
            }
            if (flip) {
                f = 10 - f;
                r = board_1.BOARD_RANKS - 1 - r;
            }
        }
        boardTable += '</tr>';
    }
    boardTable += '</tbody></table>';
    document.getElementById('board').innerHTML = boardTable;
}
exports.drawBoard = drawBoard;
//We'll figure out how to make it highlight one square later
// Basically for a capture, you need to use z-index and abolute positioning to stack the image on
// top of the piece. Delete the created img element after though.
function highlight(m) {
    let div = document.getElementById(m.final.toString());
    div.style.backgroundImage = 'url("static/legal_move.png")';
    div.style.opacity = '0.5';
    if (div.hasChildNodes()) {
        let child = div.childNodes[0];
        child.style.opacity = '0.5';
        div.style.opacity = '1';
    }
}
function highlightMoves(index) {
    let legalMoves = g.getLegalMoves();
    for (let i = 0; i < legalMoves.length; i++) {
        let m = legalMoves[i];
        if (m.initial == index) {
            highlight(m);
        }
    }
}
function playSounds() {
}
//UI
//Probably need an edit game mode where clickpiece highlights
//and allows you to move anywhere
var clickLock = false;
var playerIndex = -1;
var playerTarget = -1;
var moveIndex = -1;
var playerTurn = true;
var currTurn = board_1.COLOR.RED;
var redPlayerIsMachine = false;
var blackPlayerIsMachine = false;
function dragPiece(event, index) {
    playerIndex = parseInt(index, 10);
    highlightMoves(playerIndex);
}
function dragFinished(event, index) {
    event.preventDefault();
    if (parseInt(index, 10) == playerIndex) {
        let e = event.target;
        e.src = '';
    }
}
function dropPiece(event, index) {
    playerTarget = parseInt(index, 10);
    let legalMoves = g.getLegalMoves();
    let moveIndex = -1;
    let move = new board_1.Move(playerIndex, playerTarget);
    for (let i = 0; i < legalMoves.length; i++) {
        if (legalMoves[i].isEqual(move)) {
            moveIndex = i;
            break;
        }
    }
    currTurn = g.getTurn;
    if (moveIndex >= 0) {
        g.makeMove(legalMoves[moveIndex]);
    }
    setTimeout(drawBoard, 16);
    clickLock = false;
    if (moveIndex >= 0 && g.hasPiece(playerTarget)) {
        document.getElementById(playerTarget.toString()).style.backgroundColor = SELECTED_COLOR;
        //Play sounds too
    }
    event.preventDefault();
    if (moveIndex >= 0) {
        //cleanup for next turn
        if (currTurn == board_1.COLOR.RED && g.getBlack instanceof machinePlayer_1.MachinePlayer) {
            let p = g.getBlack;
            //playerTurn = false;
            //p.think(); //IDK, probably need some gui wrapper function
            //That kicks off the think function and redraws on a promise from the machine?
            //Need to turn on playerTurn and stuff if necessary etc.
        }
        else {
            //playerTurn = false;
        }
    }
}
//Apparently red can move black pawns when they cross the river????
//Nevermind it happens for both
//I've occasionally seen it with chariots too
//the cannon bug came from the turn flipping somehow
function clickPiece(index) {
    /*if (!playerTurn) {
        return;
    }*/
    drawBoard();
    let val = parseInt(index, 10);
    if (g.hasPiece(val) && !clickLock) {
        document.getElementById(index.toString()).style.backgroundColor = SELECTED_COLOR;
        highlightMoves(val);
        playerIndex = val;
        clickLock = true;
    }
    else if (clickLock) {
        //I'm pretty sure we have to check if the click is back to the original square
        let legalMoves = g.getLegalMoves();
        playerTarget = val;
        let moveIndex = -1;
        let move = new board_1.Move(playerIndex, playerTarget);
        for (let i = 0; i < legalMoves.length; i++) {
            if (legalMoves[i].isEqual(move)) {
                moveIndex = i;
                break;
            }
        }
        currTurn = g.getTurn;
        if (moveIndex >= 0) {
            g.makeMove(legalMoves[moveIndex]);
        }
        setTimeout(drawBoard, 16);
        clickLock = false;
        if (moveIndex >= 0 && g.hasPiece(val)) {
            document.getElementById(val.toString()).style.backgroundColor = SELECTED_COLOR;
            //Play sounds too
        }
        if (moveIndex >= 0) {
            //cleanup for next turn
            if (currTurn == board_1.COLOR.RED && g.getBlack instanceof machinePlayer_1.MachinePlayer) {
                let p = g.getBlack;
                //playerTurn = false;
                //p.think(); //IDK, probably need some gui wrapper function
                //That kicks off the think function and redraws on a promise from the machine?
                //Need to turn on playerTurn and stuff if necessary etc.
            }
            else {
                //playerTurn = false;
            }
        }
    }
}
//All the UI functions 
//And the API calls necessary for it to work.
//Be careful to disallow droppin over sentinel cells
function makeGame(redPlayer = new GuiPlayer_1.GuiPlayer(), blackPlayer = new GuiPlayer_1.GuiPlayer(), redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10) {
    return new game_1.Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
}
function pieceSVG(c, p) {
    let str = '';
    if (c == board_1.COLOR.RED) {
        str += 'red_';
    }
    else {
        str += 'black_';
    }
    switch (p) {
        case board_1.PIECE.PAWN:
            str += 'pawn';
            break;
        case board_1.PIECE.GENERAL:
            str += 'general';
            break;
        case board_1.PIECE.ADVISOR:
            str += 'advisor';
            break;
        case board_1.PIECE.ELEPHANT:
            str += 'elephant';
            break;
        case board_1.PIECE.HORSE:
            str += 'horse';
            break;
        case board_1.PIECE.CHARIOT:
            str += 'chariot';
            break;
        case board_1.PIECE.CANNON:
            str += 'cannon';
            break;
        default:
            throw 'invalid piece to make into SVG';
    }
    str += '.svg';
    return str;
}
function print(moves) {
    moves.forEach(m => {
        console.log(m);
    });
}
var g = makeGame();
var flip = true;
drawBoard();
g.reset();
g.start();
