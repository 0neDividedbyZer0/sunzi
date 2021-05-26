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

    public comparator(other: TreeNode) {
        return this.board.comparator(other.board);
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




