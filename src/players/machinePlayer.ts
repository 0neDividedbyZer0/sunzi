import { Player } from "./player";

export const name = 'MachinePlayer'

export class MachinePlayer extends Player {
    private resolveMove: () => void = ()=>{};

    //Think resolves the move
    public think(): void {

    }
    
    public async finishedThinking(): Promise<void> {
        
    }
}