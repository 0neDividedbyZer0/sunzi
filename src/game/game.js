"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuiPlayer_1 = require("../players/GuiPlayer");
const board_1 = require("./board");
exports.name = 'game';
//This is the implementation of the game itself
//TODO: 3 move draw checking, 3 check rules, infinite time? Timer should start after first move
//Nice formatting of moves after a game etc.
//Undo and redo functions
/**
 * Usage: you initialize a game. Then you do
 * game.reset();
 * game.start();
 * await game.cleanupGame();
 * do stuff with game.getWinner();
 */
const sToNs = 1000000000;
class Game {
    constructor(redPlayer, blackPlayer, redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10) {
        this.redTime = BigInt(15 * 60 * sToNs);
        this.blackTime = BigInt(15 * 60 * sToNs);
        this.redPlus = BigInt(10 * sToNs);
        this.blackPlus = BigInt(10 * sToNs);
        this.currTime = BigInt(0);
        this.lastTurn = board_1.COLOR.EMPTY;
        this.redTimer = BigInt(0);
        this.blackTimer = BigInt(0);
        this.colorWonByTimeout = board_1.COLOR.EMPTY;
        this.gameFinishUnlock = () => { };
        this.gameFinishLock = new Promise((res) => {
            this.gameFinishUnlock = res;
        });
        this.winner = board_1.COLOR.SENTINEL;
        this.redPlayer = redPlayer;
        this.blackPlayer = blackPlayer;
        this.redTime = BigInt(redTime * 60 * sToNs);
        this.blackTime = BigInt(blackTime * 60 * sToNs);
        this.redPlus = BigInt(redPlus * sToNs);
        this.blackPlus = BigInt(blackPlus * sToNs);
        this.board = board_1.Board.startBoard();
        this.turn = board_1.COLOR.RED;
        this.historyString = '';
        this.clock = setInterval(() => { 0; }, 0);
        clearInterval(this.clock);
        this.gameLoop = setInterval(() => { 0; }, 0);
        clearInterval(this.gameLoop);
    }
    setRedPlayer(p) {
        this.redPlayer = p;
    }
    setBlackPlayer(p) {
        this.blackPlayer = p;
    }
    start() {
        this.currTime = process.hrtime.bigint();
        this.gameFinishLock = new Promise((res) => {
            this.gameFinishUnlock = res;
        });
        //Is this even running?
        this.clock = setInterval(() => {
            //It seems to be terminating after one run
            //Is this function getting put into the callback queue?
            this.updateTime();
            if (this.isTimedOut()) {
                if (this.turn == board_1.COLOR.RED) {
                    this.colorWonByTimeout = board_1.COLOR.BLACK;
                }
                else {
                    this.colorWonByTimeout = board_1.COLOR.RED;
                }
                this.checkGameFinished();
                clearInterval(this.clock);
            }
        }, 0);
        //We need it so that the gameLoop is outside game and in the gui or something
        /*
        this.gameLoop = setInterval(() => {
            if (this.colorWonByTimeout != COLOR.EMPTY) {
                console.log('\nGame is over');
                if (this.colorWonByTimeout == COLOR.RED) {
                    console.log('Red won');
                } else {
                    console.log('Black won');
                }
                clearInterval(this.gameLoop);
                process.exit(0);
            } else if (this.isGameOver()) {
                console.log('\nGame is over');
                if (this.getTurn == COLOR.RED) {
                    console.log('Black won');
                } else {
                    console.log('Red won');
                }
                clearInterval(this.gameLoop);
                process.exit(0);
            } else if (this.lastTurn != this.getTurn) {
                this.lastTurn = this.getTurn;
                this.play();
            }
        }, 16); */
    }
    //Make async so it can time out properly?
    async play() {
        let move;
        if (this.turn == board_1.COLOR.RED) {
            move = await this.redPlayer.chooseMove(this, this.turn);
            this.redTimer += this.redPlus;
            this.turn = board_1.COLOR.BLACK;
        }
        else {
            move = await this.blackPlayer.chooseMove(this, this.turn);
            this.blackTimer += this.blackPlus;
            this.turn = board_1.COLOR.RED;
        }
        //Check timeout here to stop making moves
        if (this.winner == board_1.COLOR.SENTINEL) {
            this.checkGameFinished();
            this.board.makeMove(move);
        }
    }
    //These crawl the game history. If there is a change, the 
    //history is deleted
    undo() {
    }
    redo() {
    }
    timeLeft(c) {
        if (c == board_1.COLOR.RED) {
            return Number(this.redTimer / BigInt(sToNs));
        }
        else {
            return Number(this.blackTimer / BigInt(sToNs));
        }
    }
    timeLeftPretty(c) {
        let min, sec;
        let t = this.timeLeft(c);
        min = Math.floor(t / 60);
        sec = Math.floor(t % 60);
        return [min, sec];
    }
    updateTime() {
        let timeToSet = process.hrtime.bigint();
        if (this.turn == board_1.COLOR.RED) {
            this.redTimer -= timeToSet - this.currTime;
        }
        else {
            this.blackTimer -= timeToSet - this.currTime;
        }
        this.currTime = timeToSet;
    }
    isTimedOut() {
        if (this.turn == board_1.COLOR.RED) {
            return this.redTimer <= 0;
        }
        else {
            return this.blackTimer <= 0;
        }
    }
    //In minutes
    editRedTime(newRedTime) {
        this.redTime = BigInt(newRedTime * 60 * sToNs);
    }
    editBlackTime(newBlackTime) {
        this.blackTime = BigInt(newBlackTime * 60 * sToNs);
    }
    //In seconds
    editRedPlus(newRedPlus) {
        this.redPlus = BigInt(newRedPlus * sToNs);
    }
    editBlackPlus(newBlackPlus) {
        this.blackPlus = BigInt(newBlackPlus * sToNs);
    }
    interrupt() {
        clearInterval(this.gameLoop);
        clearInterval(this.clock);
    }
    stopTime() {
        clearInterval(this.clock);
    }
    startTime() {
        this.currTime = process.hrtime.bigint();
        this.clock = setInterval(() => {
            //It seems to be terminating after one run
            //Is this function getting put into the callback queue?
            this.updateTime();
            if (this.isTimedOut()) {
                if (this.turn == board_1.COLOR.RED) {
                    this.colorWonByTimeout = board_1.COLOR.BLACK;
                }
                else {
                    this.colorWonByTimeout = board_1.COLOR.RED;
                }
                clearInterval(this.clock);
            }
        }, 0);
    }
    restartTime() {
        this.currTime = process.hrtime.bigint();
        this.redTimer = this.redTime;
        this.blackTimer = this.blackTime;
        this.clock = setInterval(() => {
            this.updateTime();
            if (this.isTimedOut()) {
                if (this.turn == board_1.COLOR.RED) {
                    this.colorWonByTimeout = board_1.COLOR.BLACK;
                }
                else {
                    this.colorWonByTimeout = board_1.COLOR.RED;
                }
                clearInterval(this.clock);
            }
        }, 0);
    }
    reset() {
        this.board = board_1.Board.startBoard();
        this.turn = board_1.COLOR.RED;
        this.historyString = '';
        this.redTimer = this.redTime;
        this.blackTimer = this.blackTime;
        this.colorWonByTimeout = board_1.COLOR.EMPTY;
        this.lastTurn = board_1.COLOR.EMPTY;
        this.winner = board_1.COLOR.SENTINEL;
    }
    isWon() {
        return this.board.isMated(this.turn);
    }
    //Print out WXF formatted game move history
    toString() {
        return '';
    }
    get getBoard() {
        return this.board;
    }
    get getTurn() {
        return this.turn;
    }
    get getRed() {
        return this.redPlayer;
    }
    get getBlack() {
        return this.blackPlayer;
    }
    getLegalMoves() {
        return this.board.legalMoves(this.turn);
    }
    //Funnel a move string into the correct player
    makeMove(m) {
        if (this.turn == board_1.COLOR.RED) {
            if (this.redPlayer instanceof GuiPlayer_1.GuiPlayer) {
                let p = this.redPlayer;
                p.receiveMove(m);
            }
        }
        else {
            if (this.blackPlayer instanceof GuiPlayer_1.GuiPlayer) {
                let p = this.blackPlayer;
                p.receiveMove(m);
            }
        }
    }
    hasPiece(index) {
        let f = index % board_1.BOARD_FILES;
        let r = Math.floor(index / board_1.BOARD_FILES);
        let p = this.board.getPiece(f, r);
        return p != board_1.PIECE.SENTINEL && p != board_1.PIECE.EMPTY;
    }
    //No longer need the game loop.
    async cleanupGame() {
        await this.gameFinishLock;
        if (this.colorWonByTimeout) {
            this.winner = this.colorWonByTimeout;
        }
        else if (this.isWon()) {
            this.winner = this.turn;
        }
    }
    getWinner() {
        return this.winner;
    }
    checkGameFinished() {
        if (this.isTimedOut() || this.isWon()) {
            this.gameFinishUnlock();
        }
    }
}
exports.Game = Game;
