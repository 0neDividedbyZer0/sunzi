import { COLOR, Move } from "../game/board";
import { Game } from "../game/game";
import { moveToString } from "../utils";
import { Player } from "./player";

export const name = 'GuiPlayer';
//For the move method, it needs to listen for the 
//input move

export class GuiPlayer extends Player {
    private resolveMove: (arg0: Move) => void = () => {};
    

    public async chooseMove(g: Game, c: COLOR): Promise<Move> {
        return new Promise<Move>((res, rej) => {
            this.resolveMove = res;
            this.interruptMove = rej;
        }).catch((rejection:any) => {
            return new Move(-1, -1);
        });
    }
    

    public receiveMove(m: Move): void {
        this.resolveMove(m);
    }

}
