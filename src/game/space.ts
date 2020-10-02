export const name = 'space'

export class Space {
    private file: number;
    private rank: number;
    
    constructor(file: number, rank: number) {
        this.file = file;
        this.rank = rank;
    }

    f(): number {
        return this.file;
    }

    r(): number {
        return this.rank;
    }

    equals(other: Space): boolean {
        return (this.f() == other.f()) && (this.r() == other.r());
    }
}