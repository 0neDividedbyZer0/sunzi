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
    var gameLoop = setImmediate(() => {
        if (game.colorWonByTimeout != COLOR.EMPTY) {
            console.log('Game is over');
            if (game.colorWonByTimeout == COLOR.RED) {
                console.log('Red won');
            } else {
                console.log('Black won');
            }
            clearImmediate(gameLoop);
        }
        if (game.isGameOver()) {
            console.log('Game is over');
            if (game.getTurn == COLOR.RED) {
                console.log('Black won');
            } else {
                console.log('Red won');
            }
            clearImmediate(gameLoop);
        }
        if (lastTurn != game.getTurn) {
            lastTurn = game.getTurn;
            game.play();
        }
    });
}

runGame();