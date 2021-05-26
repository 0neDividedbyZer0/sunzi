import { GuiPlayer } from "../players/GuiPlayer";
import { humanPlayer } from "../players/humanPlayer";
import { Player } from "../players/player"
import { Board, BOARD_FILES, COLOR, Move, PIECE } from "./board";

export const name = 'game'

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

const sToNs: number = 1000000000;

export class Game {
    private redPlayer: Player;
    private blackPlayer: Player;
    private redTime: bigint = BigInt(15 * 60 * sToNs);
    private blackTime: bigint = BigInt(15 * 60 * sToNs);
    private redPlus: bigint = BigInt(10 * sToNs);
    private blackPlus: bigint = BigInt(10 * sToNs);
    private currTime: bigint = BigInt(0);
    private board: Board;
    private turn: COLOR;
    private lastTurn: COLOR = COLOR.EMPTY;
    private historyString: string;
    private redTimer: bigint = BigInt(0);
    private blackTimer: bigint = BigInt(0);
    private clock: NodeJS.Timeout;
    public colorWonByTimeout: COLOR = COLOR.EMPTY;
    private gameFinishUnlock: (value: void | PromiseLike<void>) => void = () => {};
    private gameFinishLock: Promise<void> = new Promise<void>((res) => {
        this.gameFinishUnlock = res;
    });
    private winner: COLOR = COLOR.SENTINEL;

    public constructor(redPlayer: Player, blackPlayer: Player, redTime:number = 15, blackTime:number = 15, 
            redPlus = 10, blackPlus = 10) {
        this.redPlayer = redPlayer;
        this.blackPlayer = blackPlayer;
        this.redTime = BigInt(redTime * 60 * sToNs);
        this.blackTime = BigInt(blackTime * 60 * sToNs);
        this.redPlus = BigInt(redPlus * sToNs);
        this.blackPlus = BigInt(blackPlus * sToNs);
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
        this.clock = setInterval(() => {0}, 0);
        clearInterval(this.clock);
    }

    public setRedPlayer(p: Player): void {
        this.redPlayer = p;
    }

    public setBlackPlayer(p: Player): void {
        this.blackPlayer = p;
    }

    public start(): void {
        this.gameFinishLock = new Promise<void>((res) => {
            this.gameFinishUnlock = res;
        });
    }

    //Make async so it can time out properly?
    public async play(): Promise<void> {
        let move: Move;
        if (this.turn == COLOR.RED) {
            move = await this.redPlayer.chooseMove(this, this.turn);
            if (this.board.move_history.length >= 2 && this.winner == COLOR.SENTINEL) {
                this.redTimer += this.redPlus;
            }
            this.turn = COLOR.BLACK;
        } else {
            move = await this.blackPlayer.chooseMove(this, this.turn);
            if (this.board.move_history.length >= 2 && this.winner == COLOR.SENTINEL) {
                this.blackTimer += this.blackPlus;
            }
            this.turn = COLOR.RED;
        }
        //Check timeout here to stop making moves
        if (this.winner == COLOR.SENTINEL) {
            this.checkGameFinished();
            this.board.makeMove(move);
            this.checkGameFinished();
        }

        if (this.board.move_history.length == 2) {
            this.currTime = process.hrtime.bigint();
            this.clock = setInterval(() => {
                this.updateTime();
                if (this.isTimedOut()) {
                    if (this.turn  == COLOR.RED) {
                        this.colorWonByTimeout = COLOR.BLACK;
                    } else {
                        this.colorWonByTimeout = COLOR.RED;
                    }
                    this.checkGameFinished();
                    clearInterval(this.clock);
                    return;
                } 
                if (this.getWinner() != COLOR.SENTINEL) {
                    clearInterval(this.clock);
                }
            }, 0);
        }
    }

    //These crawl the game history. If there is a change, the 
    //history is deleted
    public undo(): void {

    }

    public redo(): void {

    }

    public timeLeft(c: COLOR): number {
        if (c == COLOR.RED) {
            return Number(this.redTimer / BigInt(sToNs));
        } else {
            return Number(this.blackTimer / BigInt(sToNs));
        }
    }

    public timeLeftPretty(c: COLOR): string[] {
        let min, sec;
        let t = this.timeLeft(c);
        min = Math.floor(t / 60).toString();
        sec = ('0' + Math.floor(t % 60)).slice(-2);
        return [min, sec];
    }

    private updateTime() {
        let timeToSet = process.hrtime.bigint();
        if (this.turn == COLOR.RED) {
            this.redTimer -= timeToSet - this.currTime;
        } else {
            this.blackTimer -= timeToSet - this.currTime;
        }
        this.currTime = timeToSet;
    }

    public isTimedOut(): boolean {
        if (this.turn == COLOR.RED) {
            return this.redTimer <= 0;
        } else {
            return this.blackTimer <= 0;
        }
    }

    //In minutes
    public editRedTime(newRedTime: number): void {
        this.redTime = BigInt(newRedTime * 60 * sToNs);
    }

    public editBlackTime(newBlackTime: number): void {
        this.blackTime = BigInt(newBlackTime * 60 * sToNs);
    }

    //In seconds
    public editRedPlus(newRedPlus: number): void {
        this.redPlus = BigInt(newRedPlus * sToNs);
    }

    public editBlackPlus(newBlackPlus: number): void {
        this.blackPlus = BigInt(newBlackPlus * sToNs);
    }

    public interrupt(): void {
        clearInterval(this.clock);
    }

    public stopTime(): void {
        clearInterval(this.clock);
    }

    public startTime(): void {
        this.currTime = process.hrtime.bigint();
        this.clock = setInterval(() => {
            //It seems to be terminating after one run
            //Is this function getting put into the callback queue?
            this.updateTime();
            if (this.isTimedOut()) {
                if (this.turn  == COLOR.RED) {
                    this.colorWonByTimeout = COLOR.BLACK;
                } else {
                    this.colorWonByTimeout = COLOR.RED;
                }
                clearInterval(this.clock);
            } else if (this.getWinner() != COLOR.SENTINEL) {
                clearInterval(this.clock);
            }
        }, 0);
    }

    public restartTime(): void {
        this.currTime = process.hrtime.bigint();
        this.redTimer = this.redTime;
        this.blackTimer = this.blackTime;
        this.clock = setInterval(() => {
            this.updateTime();
            if (this.isTimedOut()) {
                if (this.turn  == COLOR.RED) {
                    this.colorWonByTimeout = COLOR.BLACK;
                } else {
                    this.colorWonByTimeout = COLOR.RED;
                }
                clearInterval(this.clock);
            } else if (this.getWinner() != COLOR.SENTINEL) {
                clearInterval(this.clock);
            }
        }, 0);
    }

    public reset(): void {
        if (this.winner != COLOR.SENTINEL) {
            clearInterval(this.clock);
        }
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
        this.redTimer = this.redTime;
        this.blackTimer = this.blackTime;
        this.colorWonByTimeout = COLOR.EMPTY;
        this.lastTurn = COLOR.EMPTY;
        this.winner = COLOR.SENTINEL;
        
    }

    public isWon(): boolean {
        return this.board.isMated(this.turn);
    }

    public isRepetition(): boolean {
        return this.board.repeated();
    }

    //Print out WXF formatted game move history
    public toString(): string {
        return '';
    }

    public get getBoard(): Board {
        return this.board;
    }

    public get getTurn(): COLOR {
        return this.turn;
    }

    public get getRed(): Player {
        return this.redPlayer;
    }

    public get getBlack(): Player {
        return this.blackPlayer;
    }

    public getLegalMoves(): Move[] {
        return this.board.legalMoves(this.turn);
    }

    //Funnel a move string into the correct player
    public makeMove(m: Move): void {
        if (this.turn == COLOR.RED) {
            if (this.redPlayer instanceof GuiPlayer) {
                let p = this.redPlayer as GuiPlayer;
                p.receiveMove(m);
            }
        } else {
            if (this.blackPlayer instanceof GuiPlayer) {
                let p = this.blackPlayer as GuiPlayer;
                p.receiveMove(m);
            }
        }
    }

    public hasPiece(index: number): boolean {
        let f = index % BOARD_FILES;
        let r = Math.floor(index / BOARD_FILES);
        let p = this.board.getPiece(f, r);
        return p != PIECE.SENTINEL && p != PIECE.EMPTY;
    }
    
    //No longer need the game loop.
    public async cleanupGame(): Promise<void> {
        await this.gameFinishLock;
        if (this.colorWonByTimeout) {
            this.winner = this.colorWonByTimeout;
        } else if (this.isWon()) {
            if (this.turn == COLOR.RED) {
                this.winner = COLOR.BLACK;
            } else if (this.turn == COLOR.BLACK) {
                this.winner = COLOR.RED;
            }
        } else if (this.isRepetition()) {
            this.winner = COLOR.EMPTY;
        }
        this.stopTime();
        if (this.turn == COLOR.RED) {
            this.redPlayer.interrupt();
        } else {
            this.blackPlayer.interrupt();
        }
    }

    public getWinner(): COLOR {
        return this.winner;
    }

    public draw(): void {
        this.winner = COLOR.EMPTY;
        this.checkGameFinished();
    }

    public resign(): void {
        if (this.turn == COLOR.RED) {
            this.winner = COLOR.BLACK;
        } else {
            this.winner = COLOR.RED;
        }
        this.checkGameFinished();
    }

    public checkGameFinished(): void {
        if (this.isTimedOut() || this.isWon() || this.isRepetition() || this.winner != COLOR.SENTINEL) {
            this.gameFinishUnlock();
        }
    }

    //Game Over method needs to check mate and three repetition
}
