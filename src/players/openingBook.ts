import { Board, COLOR, Move, PIECE } from "../game/board"

export const name = 'openingBook'
//Need hashing and tree stuff. Also need mirroring across central file functions
//Need to copy or somehow enumerate boards and save them so they can be loaded
//There's probably about 5000 total opening moves, as a safe upper limit, but we only
//store half because of symmetry so about 2500. That's safely sortable, it's not
//Worth hashing

//Wrapper over an array because Javascript is stupid



class TreeNode {
    //Also need to hash it somehow
    public board: Board;
    //The move string is the key
    public branches: Record<string, TreeNode>;
    
    public constructor(board: Board, branches = {}) {
        this.board = board;
        this.branches = branches;
    }

    // If this > other => +, this < other => -, else 0
    /* 
        We just check the arrays for each piece, since the board is sparse.
        If numpieces are less, then that board is smaller. Then we check in order of 
        the red pieces and then black pieces. It's easy to just compute weighted sums
        of the indices by an order and use those in the comparator
    */
    public comparator(other: TreeNode): number {

        return 0;
    }
}

export const root: TreeNode = new TreeNode(Board.startBoard());

export var nodeList: TreeNode[] = [root];

//a inclusive, b exclusive, b >= a
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
    mergeSort(list, a, Math.floor((a + b) / 2));
    mergeSort(list, Math.floor((a + b) / 2), b);
}

//Needs implementation, I'm  too tired right now
function binarySearch(list: TreeNode[], b: Board): TreeNode  {
    let l = 0;
    let r = list.length - 1;
    while (l < r) {
        let i = (r - l) / 2 
    }
    return new TreeNode(new Board());
}




