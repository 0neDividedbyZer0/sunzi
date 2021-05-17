import { BOARD_FILES, BOARD_RANKS, COLOR, PIECE, FILES, Move } from "./src/game/board";
import { Game } from "./src/game/game";
import { GuiPlayer } from "./src/players/GuiPlayer";
import { humanPlayer } from "./src/players/humanPlayer";
import { MachinePlayer } from "./src/players/machinePlayer";
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

const SELECTED_COLOR = 'brown';

export function drawBoard(): void {
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
                'onclick="clickPiece(this.id)" ' +
                'ondragstart="dragPiece(event, this.id)" ' +
                'ondragover="dragFinished(event, this.id)" ' +
                'ondrop="dropPiece(event, this.id)">';

            if (c == COLOR.EMPTY || c == COLOR.SENTINEL) {
                boardTable += '<td>';
            } else {
                boardTable += pieceImg;
                boardTable += '<td>';
            }
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

//We'll figure out how to make it highlight one square later
// Basically for a capture, you need to use z-index and abolute positioning to stack the image on
// top of the piece. Delete the created img element after though.
function highlight(m: Move): void {
    let div = document.getElementById(m.final.toString());
    div!.style.backgroundImage = 'url("static/legal_move.png")';
    div!.style.opacity = '0.5';
    if (div!.hasChildNodes()) {
        let child = div!.childNodes[0] as HTMLElement;
        child!.style.opacity = '0.5';
        div!.style.opacity = '1';
    }
}

function highlightMoves(index: number): void {
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

var clickLock: boolean = false;
var playerIndex: number = -1;
var playerTarget: number = -1;
var moveIndex: number = -1;
var playerTurn: boolean = true;
var currTurn: COLOR = COLOR.RED;
var redPlayerIsMachine: boolean = false;
var blackPlayerIsMachine: boolean = false;

function dragPiece(event: Event, index: string): void {
    playerIndex = parseInt(index, 10);
    highlightMoves(playerIndex);
}

function dragFinished(event: Event, index: string): void {
    event!.preventDefault();
    if (parseInt(index, 10) == playerIndex) {
        let e = event.target as HTMLImageElement
        e.src = '';
    }
}

function dropPiece(event: Event, index: string): void {
    playerTarget = parseInt(index, 10);

    let legalMoves = g.getLegalMoves();
    let moveIndex = -1;
    let move = new Move(playerIndex, playerTarget);
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
        document.getElementById(playerTarget.toString())!.style.backgroundColor = SELECTED_COLOR;
        //Play sounds too
    }

    event.preventDefault();
    if (moveIndex >= 0) {
        //cleanup for next turn
        if (currTurn == COLOR.RED && g.getBlack instanceof MachinePlayer) {
            let p = g.getBlack as MachinePlayer;
            //playerTurn = false;
            //p.think(); //IDK, probably need some gui wrapper function
            //That kicks off the think function and redraws on a promise from the machine?
            //Need to turn on playerTurn and stuff if necessary etc.
        } else {
            //playerTurn = false;
        }
    }       
}


//Apparently red can move black pawns when they cross the river????
//Nevermind it happens for both
//I've occasionally seen it with chariots too
//the cannon bug came from the turn flipping somehow
function clickPiece(index: string): void {
    /*if (!playerTurn) {
        return;
    }*/
    drawBoard();
    let val = parseInt(index, 10);

    if (g.hasPiece(val) && !clickLock) {
        document.getElementById(index.toString())!.style.backgroundColor = SELECTED_COLOR;
        highlightMoves(val);
        playerIndex = val;
        clickLock = true;
    } else if(clickLock) {
        //I'm pretty sure we have to check if the click is back to the original square
        let legalMoves = g.getLegalMoves();
        playerTarget = val;
        let moveIndex = -1;
        let move = new Move(playerIndex, playerTarget);
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
        setTimeout(drawBoard, 5); 
        clickLock = false;
        if (moveIndex >= 0 && g.hasPiece(val)) {
            document.getElementById(val.toString())!.style.backgroundColor = SELECTED_COLOR;
            //Play sounds too
        }

        if (moveIndex >= 0) {
            //cleanup for next turn
            if (currTurn == COLOR.RED && g.getBlack instanceof MachinePlayer) {
                let p = g.getBlack as MachinePlayer;
                //playerTurn = false;
                //p.think(); //IDK, probably need some gui wrapper function
                //That kicks off the think function and redraws on a promise from the machine?
                //Need to turn on playerTurn and stuff if necessary etc.
            } else {
                //playerTurn = false;
            }
        }       
    }
}

//All the UI functions 
//And the API calls necessary for it to work.
//Be careful to disallow droppin over sentinel cells


function makeGame(redPlayer: Player = new GuiPlayer(), blackPlayer: Player = new GuiPlayer(),
    redTime = 1, blackTime = 1, redPlus = 0, blackPlus = 0): Game {
    return new Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
}

async function initGame(game: Game): Promise<void> {
    game.reset();
    game.start();
    await game.cleanupGame();
    if (game.getWinner() == COLOR.RED) {
        console.log('\n\nRed Won\n\n');
    } else if (game.getWinner() == COLOR.BLACK) {
        console.log('\n\nBlack Won\n\n');
    } else if (game.getWinner() == COLOR.EMPTY) {
        console.log('\n\nDraw\n\n')
    }
}

async function runGame(game: Game): Promise<void> {
    while (game.getWinner() == COLOR.SENTINEL) {
        await game.play();
    }
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

function print(moves: Move[]) {
    moves.forEach(m => {
        console.log(m);
    });
}

var g: Game = makeGame();

var flip: boolean = true;

drawBoard();

initGame(g);
runGame(g);





