export const name = 'space'

import {Color} from './pieces/piece'

export class Space {
    private file: number;
    private rank: number;
    private color: Color;
    
    constructor(file: number, rank: number, color: Color) {
        this.file = file;
        this.rank = rank;
        this.color = color;
    }

    f(): number {
        return this.file;
    }

    r(): number {
        return this.rank;
    }

    c(): Color {
        return this.color;
    }

    set_c(color: Color): void {
        this.color = color;
    }

    equals(other: Space): boolean {
        return (this.f() == other.f()) && (this.r() == other.r());
    }
}