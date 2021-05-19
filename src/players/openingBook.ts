import { Board, COLOR, Move, PIECE } from "../game/board"

export const name = 'openingBook'
//Need hashing and tree stuff. Also need mirroring across central file functions
//Need to copy or somehow enumerate boards and save them so they can be loaded
//There's probably about 5000 total opening moves, as a safe upper limit, but we only
//store half because of symmetry so about 2500. That's safely sortable, it's not
//Worth hashing
//TODO: implement a binaryinsert of some kind. Need mirroring and stuff



class TreeNode {
    //Also need to hash it somehow
    public board: Board;
    //The move string is the key
    public branches: Record<string, TreeNode>;
    
    public constructor(board: Board, branches = {}) {
        this.board = board;
        this.branches = branches;
    }

    private static indexToVal(input: number[]): number {
        if (input.length == 2) {
            return Math.min(1000 * input[0] + input[1], 1000 * input[1] + input[0]);
        } else if (input.length == 1) {
            return input[0];
        } else {
            return 0;
        }
    }
    // If this > other => +, this < other => -, else 0
    /* 
        Lexicographic order
    */
    public comparator(other: TreeNode): number {
        //For each color and piece, we create a number
        //If there are two pieces, do smaller * 1000 + larger, 
        //If there is 1 piece, do that piece
        //If there is no piece, do 0, should create a sequence of 14 numbers.
        //Compare in lexicographic order
        for (let i: number = COLOR.RED; i <= COLOR.BLACK; i++) {
            for (let j: number = PIECE.GENERAL; j <= PIECE.PAWN; j++) {
                let left = TreeNode.indexToVal(this.board.dict[i][j]);
                let right = TreeNode.indexToVal(other.board.dict[i][j]);
                if (left < right) {
                    return -1;
                } else if (left > right) {
                    return 1;
                }
            }
        }
        return 0;
    }
}

export const root: TreeNode = new TreeNode(Board.startBoard());

export var nodeList: TreeNode[] = [root];

//a inclusive, b exclusive, b > a
function mergeSort(list: TreeNode[], a: number, b: number): void {
    if (b - a <= 1) {
        return;
    } else if (b - a == 2) {
        if (list[a].comparator(list[a + 1]) > 0) {
            let tmp: TreeNode = list[a + 1];
            list[a + 1] = list[a];
            list[a] = tmp;
        }
        return;
    } 
    let median = Math.floor((a + b) / 2);
    let left_list = list.slice(a, median);
    let right_list = list.slice(median, b);
    mergeSort(left_list, 0, median - a);
    mergeSort(right_list, 0, b - median);
    let l = 0;
    let r = 0;
    for (let i = a; i < b; i++) {
        if (left_list[l] <= right_list[r]) {
            list[i] = left_list[l];
            l++;
        } else {
            list[i] = right_list[r];
            r++;
        }
    }
}

//Needs implementation, I'm  too tired right now
function binarySearch(list: TreeNode[], b: Board | TreeNode): number  {
    if (b instanceof Board) {
        b = new TreeNode(b);
    }
    let l = 0;
    let r = list.length - 1;
    while (l < r) {
        let i = Math.floor((l + r) / 2);
        let val = list[i].comparator(b);
        if (val == 0) {
            return i;
        } else if (val < 0) {
            l = i + 1;
        } else {
            r = i - 1;
        }
    }
    return -1;
}




