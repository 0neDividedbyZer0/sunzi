import { humanPlayer } from "../players/humanPlayer";
import { COLOR, Move } from "./board";
import { Game } from "./game";

export const name = 'gameRunner';
//Basically has all the main method stuff



export function runGame(): void {
    console.log('Starting game');
    let game: Game = new Game(new humanPlayer(), new humanPlayer());
    let b = game.getBoard;
    var lastTurn = game.getTurn;
    //This should probably be rewritten recursively so that 
    //game.play() won't block, and it will basically catch 
    //the moment when a turn has timedout. Otherwise proceed normally
    //Basically, we'll have a setImmediate here for the game.
    //Two conditions: the game will block until turn has changed
    //The game will block timeout wins until colorWon has been set
    while (!game.isGameOver()) {
        try {
            game.play();
            //It might be that we need to leave this without an await
        } catch(e) {
            throw e;
        }
    }
    console.log('Game is over');
    if (game.getTurn == COLOR.RED) {
        console.log('Black won');
    } else {
        console.log('Red won');
    }

}

runGame();