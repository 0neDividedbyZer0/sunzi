import { Player } from "../players/player"
import { Board, COLOR, Move } from "./board";

export const name = 'game'

//This is the implementation of the game itself
//TODO: 3 move draw checking, timeout, 3 check rules
//Undo and redo functions

export class Game {
    private redPlayer: Player;
    private blackPlayer: Player;
    private board: Board;
    private turn: COLOR;
    private historyString: string;

    public constructor(redPlayer: Player, blackPlayer: Player) {
        this.redPlayer = redPlayer;
        this.blackPlayer = blackPlayer;
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
    }

    public setRedPlayer(p: Player): void {
        this.redPlayer = p;
    }

    public setBlackPlayer(p: Player): void {
        this.blackPlayer = p;
    }

    public play(): void {
        let move: Move;
        if (this.turn == COLOR.RED) {
            move = this.redPlayer.chooseMove(this, this.turn);
            this.turn = COLOR.BLACK;
        } else {
            move = this.blackPlayer.chooseMove(this, this.turn);
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

    public reset(): void {
        this.board = Board.startBoard();
        this.turn = COLOR.RED;
        this.historyString = '';
    }

    public isGameOver(): boolean {
        return false;
    }

    //Print out WXF formatted game move history
    public toString(): string {
        return '';
    }

    //Game Over method needs to check mate and three repetition
}


