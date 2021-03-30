import { Board, Move, COLOR, PIECE, BOARD_FILES, BOARD_RANKS } from "../src/game/board";

var assert = require('assert');
describe('Board Tests', function() {
    describe('Moves Suite', function() {
        describe('Pawn Moves 1', function() {
            it('Check pawn generates correctly before river', function() {
                let b: Board = new Board();
                b.setColor(5, 6, COLOR.RED);
                b.setPiece(5, 6, PIECE.PAWN);
                b.redPawns.push(6 * BOARD_FILES + 5);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 1);
                assert.equal(m[0].isEqual(new Move(6 * BOARD_FILES + 5, 7 * BOARD_FILES + 5)), true);
            });
        })
    });
});