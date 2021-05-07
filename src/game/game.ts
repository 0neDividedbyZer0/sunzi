import { Player } from "../players/player"
import { Board } from "./board";

export const name = 'game'

//This is the implementation of the game itself
//TODO: 3 move draw checking
//Undo and redo functions

export class Game {
    private redPlayer: Player;
    private blackPlayer: Player;
    private board: Board;

    public constructor(redPlayer: Player, blackPlayer: Player) {
        this.redPlayer = redPlayer;
        this.blackPlayer = blackPlayer;
        this.board = Board.startBoard();
    }
}


