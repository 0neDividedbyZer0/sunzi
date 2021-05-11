import { Player } from "../players/player"
import { Board, COLOR, Move } from "./board";

export const name = 'game'

//This is the implementation of the game itself
//TODO: 3 move draw checking, 3 check rules, infinite time?
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
    private lastTurn: COLOR = COLOR.EMPTY;
    private historyString: string;
    private redTimer: number = 0;
    private blackTimer: number = 0;
    private clock: NodeJS.Timeout;
    private gameLoop: NodeJS.Timeout;
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
        this.currTime = new Date().getTime();
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
            return Math.floor(this.redTimer / (60 * 1000));
        } else {
            return Math.floor(this.blackTimer / (60 * 1000));
        }
    }

    public timeLeftPretty(c: COLOR): number[] {
        let min, sec;
        if (c == COLOR.RED) {
            min = Math.floor(this.redTimer / (60 * 1000));
            sec = Math.floor( (this.redTimer % (60 * 1000)) / 1000);
            return [min, sec];
        } else {
            min = Math.floor(this.blackTimer / (60 * 1000));
            sec = Math.floor( (this.blackTimer % (60 * 1000)) / 1000);
            return [min, sec];
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

    public isTimedOut(): boolean {
        if (this.turn == COLOR.RED) {
            return this.redTimer <= 0;
        } else {
            return this.blackTimer <= 0;
        }
    }

    //In minutes
    public editRedTime(newRedTime: number): void {
        this.redTime = newRedTime * 60 * 1000;
    }

    public editBlackTime(newBlackTime: number): void {
        this.blackTime = newBlackTime * 60 * 1000;
    }

    //In seconds
    public editRedPlus(newRedPlus: number): void {
        this.redPlus = newRedPlus * 1000;
    }

    public editBlackPlus(newBlackPlus: number): void {
        this.blackPlus = newBlackPlus * 1000;
    }

    public interrupt(): void {
        clearInterval(this.gameLoop);
        clearInterval(this.clock);
    }

    public stopTime(): void {
        clearInterval(this.clock);
    }

    public startTime(): void {
        this.currTime = new Date().getTime();
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
        this.currTime = new Date().getTime();
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
    

    //Game Over method needs to check mate and three repetition
}
