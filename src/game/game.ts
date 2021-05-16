import { GuiPlayer } from "../players/GuiPlayer";
import { humanPlayer } from "../players/humanPlayer";
import { Player } from "../players/player"
import { Board, BOARD_FILES, COLOR, Move, PIECE } from "./board";

export const name = 'game'

//This is the implementation of the game itself
//TODO: 3 move draw checking, 3 check rules, infinite time?
//Nice formatting of moves after a game etc.
//Undo and redo functions

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
    private gameLoop: NodeJS.Timeout;
    public colorWonByTimeout: COLOR = COLOR.EMPTY;

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
        this.gameLoop = setInterval(() => {0}, 0);
        clearInterval(this.gameLoop);
    }

    public setRedPlayer(p: Player): void {
        this.redPlayer = p;
    }

    public setBlackPlayer(p: Player): void {
        this.blackPlayer = p;
    }

    public start(): void {
        this.currTime = process.hrtime.bigint();
        //Is this even running?
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
            }
        }, 0);

        //We need it so that the gameLoop is outside game and in the gui or something
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
        }, 16);
    }

    //Make async so it can time out properly?
    public async play(): Promise<void> {
        let move: Move;
        if (this.turn == COLOR.RED) {
            move = await this.redPlayer.chooseMove(this, this.turn);
            this.redTimer += this.redPlus;
            this.turn = COLOR.BLACK;
        } else {
            move = await this.blackPlayer.chooseMove(this, this.turn);
            this.blackTimer += this.blackPlus;
            this.turn = COLOR.RED;
        }
        //Check timeout here to stop making moves
        if (this.colorWonByTimeout == COLOR.EMPTY) {
            this.board.makeMove(move);
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

    public timeLeftPretty(c: COLOR): number[] {
        let min, sec;
        let t = this.timeLeft(c);
        min = Math.floor(t / 60);
        sec = Math.floor(t % 60);
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
        clearInterval(this.gameLoop);
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
            }
        }, 0);
    }

    public reset(): void {
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
        this.redTimer = this.redTime;
        this.blackTimer = this.blackTime;
        this.colorWonByTimeout = COLOR.EMPTY;
        this.lastTurn = COLOR.EMPTY;
    }

    public isGameOver(): boolean {
        return this.board.isMated(this.turn);
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
    

    //Game Over method needs to check mate and three repetition
}
