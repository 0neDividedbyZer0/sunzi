import { humanPlayer } from "../players/humanPlayer";
import { Player } from "../players/player";
import { COLOR, Move } from "./board";
import { Game } from "./game";

export const name = 'gameRunner';
//Basically has all the main method stuff



export async function runGame(redPlayer: Player = new humanPlayer(), blackPlayer: Player = new humanPlayer(),
    redTime = 15, blackTime = 15, redPlus = 10, blackPlus = 10): Promise<void> {
    console.log('Starting game');
    let game: Game = new Game(redPlayer, blackPlayer, redTime, blackTime, redPlus, blackPlus);
    game.reset();
    game.start();
    await game.cleanupGame();
    if (game.getWinner() == COLOR.RED) {
        console.log('\n\nRed Won\n\n');
    } else if (game.getWinner() == COLOR.BLACK) {
        console.log('\n\nBlack Won\n\n');
    } else if (game.getWinner() == COLOR.EMPTY) {
        console.log('\n\nDraw\n\n')
    }
    process.exit(0);
    
}

runGame(new humanPlayer(), new humanPlayer(), 1, 1, 0, 0);