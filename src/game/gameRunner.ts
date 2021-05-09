import { humanPlayer } from "../players/humanPlayer";
import { COLOR, Move } from "./board";
import { Game } from "./game";

export const name = 'gameRunner';
//Basically has all the main method stuff



export function runGame(): void {
    console.log('Starting game');
    let game: Game = new Game(new humanPlayer(), new humanPlayer());
    let b = game.getBoard;
    while (!game.isGameOver()) {
        try {
            game.play();
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