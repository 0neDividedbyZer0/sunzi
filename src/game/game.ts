import { Player } from "../players/player"
import { Board, COLOR, Move } from "./board";

export const name = 'game'

//This is the implementation of the game itself
//TODO: 3 move draw checking, timeout, 3 check rules
//Undo and redo functions

export class Game {
    private redPlayer: Player;
    private blackPlayer: Player;
    private redTime: number = 15 * 60 * 1000;
    private blackTime: number = 15 * 60 * 1000;
    private redPlus: number = 10 * 1000;
    private blackPlus: number = 10 * 1000;
    private currTime: number = 0;
    private board: Board;
    private turn: COLOR;
    private historyString: string;
    private redTimer: number = 0;
    private blackTimer: number = 0;
    private clock: NodeJS.Immediate;
    public colorWonByTimeout: COLOR = COLOR.EMPTY;

    public constructor(redPlayer: Player, blackPlayer: Player, redTime:number = 15, blackTime:number = 15, 
            redPlus = 10, blackPlus = 10) {
        this.redPlayer = redPlayer;
        this.blackPlayer = blackPlayer;
        this.redTime = redTime * 60 * 1000;
        this.blackTime = blackTime * 60 * 1000;
        this.redPlus = redPlus * 1000;
        this.blackPlus = blackPlus * 1000;
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
        this.clock = setImmediate(() => {0});
        clearImmediate(this.clock);
    }

    public setRedPlayer(p: Player): void {
        this.redPlayer = p;
    }

    public setBlackPlayer(p: Player): void {
        this.blackPlayer = p;
    }

    public init(): void {
        this.currTime = new Date().getTime();
        this.blackTimer = this.blackTime;
        this.redTimer = this.redTime;
        this.clock = setImmediate(() => {
            this.updateTime();
            if (this.isTimedOut()) {
                if (this.turn  == COLOR.RED) {
                    this.colorWonByTimeout = COLOR.BLACK;
                } else {
                    this.colorWonByTimeout = COLOR.RED;
                }
                clearImmediate(this.clock);
            }
        });
    }

    //Make async so it can time out properly?
    public async play(): Promise<void> {
        let move: Move;
        if (this.turn == COLOR.RED) {
            move = await this.redPlayer.chooseMove(this, this.turn);
            this.redTime += this.redPlus;
            this.turn = COLOR.BLACK;
        } else {
            move = await this.blackPlayer.chooseMove(this, this.turn);
            this.blackTime += this.blackPlus;
            this.turn = COLOR.RED;
        }
        this.board.makeMove(move);
    }

    //These crawl the game history. If there is a change, the 
    //history is deleted
    public undo(): void {

    }

    public redo(): void {

    }

    public timeLeft(c: COLOR): number {
        if (c == COLOR.RED) {
            return Math.floor(this.redTimer / (60 * 1000));
        } else {
            return Math.floor(this.blackTimer / (60 * 1000));
        }
    }

    private updateTime() {
        if (this.turn == COLOR.RED) {
            let timeToSet = new Date().getTime();
            this.redTimer -= timeToSet - this.currTime;
            this.currTime = timeToSet;
        } else {
            let timeToSet = new Date().getTime();
            this.blackTimer -= timeToSet - this.currTime;
            this.currTime = timeToSet;
        }
    }

    private isTimedOut(): boolean {
        if (this.turn == COLOR.RED) {
            return this.redTimer <= 0;
        } else {
            return this.blackTimer <= 0;
        }
    }

    public reset(): void {
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
        this.redTimer = this.redTime;
        this.blackTime = this.blackTime;
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
    

    //Game Over method needs to check mate and three repetition
}
