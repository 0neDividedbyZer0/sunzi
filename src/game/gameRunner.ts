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
    game.reset();
    game.start();
    
}

runGame(new humanPlayer(), new humanPlayer(), 1, 1, 0, 0);