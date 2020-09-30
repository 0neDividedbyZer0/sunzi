export const name = 'square'

export class Square {
    private file: number;
    private rank: number;
    
    constructor(file: number, rank: number) {
        this.file = file;
        this.rank = rank;
    }
}