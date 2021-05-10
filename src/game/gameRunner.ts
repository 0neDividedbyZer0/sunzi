import { humanPlayer } from "../players/humanPlayer";
import { Player } from "../players/player";
import { COLOR, Move } from "./board";
import { Game } from "./game";

export const name = 'gameRunner';
//Basically has all the main method stuff



export function runGame(redPlayer: Player = new humanPlayer(), blackPlayer: Player = new humanPlayer(),
    redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10): void {
    console.log('Starting game');
    let game: Game = new Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
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