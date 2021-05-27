import { COLOR, Move } from "../game/board";
import { Game } from "../game/game";
import { Player } from "./player";

export const name = 'MachinePlayer'

export class MachinePlayer extends Player {
    resolveMove: (arg0: Move) => void = () => {};


    //Think resolves the move
    public async think(g: Game): Promise<void> {

    }

    public async chooseMove(g: Game, c: COLOR): Promise<Move> {
        return new Promise<Move>((res, rej) => {
            this.resolveMove = res;
            this.interruptMove = rej;
        }).catch((rejection: any) => {
            return new Move(-1, -1);
        });
        
    }
    
    public async finishedThinking(): Promise<void> {
        
    }
}