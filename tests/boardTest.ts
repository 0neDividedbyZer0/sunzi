import { Board, Move, COLOR, PIECE, BOARD_FILES, BOARD_RANKS } from "../src/game/board";

var assert = require('assert');
describe('Board Tests', function() {
    describe('Pawn Moves Suite', function() {
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
        describe('Pawn Moves 2', function() {
            it('Check pawn generates correctly after river', function() {
                let b: Board = new Board();
                b.setColor(5, 7, COLOR.RED);
                b.setPiece(5, 7, PIECE.PAWN);
                b.redPawns.push(7 * BOARD_FILES + 5);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 3);
                assert.equal(m[0].isEqual(new Move(7 * BOARD_FILES + 5, 8 * BOARD_FILES + 5)), true);
                assert.equal(m[1].isEqual(new Move(7 * BOARD_FILES + 5, 7 * BOARD_FILES + 4)), true);
                assert.equal(m[2].isEqual(new Move(7 * BOARD_FILES + 5, 7 * BOARD_FILES + 6)), true);
            });
        })
        describe('Pawn Moves 3', function() {
            it('Check pawn generates at end of the board', function() {
                let b: Board = new Board();
                b.setColor(5, 11, COLOR.RED);
                b.setPiece(5, 11, PIECE.PAWN);
                b.redPawns.push(11 * BOARD_FILES + 5);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 2);
                assert.equal(m[0].isEqual(new Move(11 * BOARD_FILES + 5, 11 * BOARD_FILES + 4)), true);
                assert.equal(m[1].isEqual(new Move(11 * BOARD_FILES + 5, 11 * BOARD_FILES + 6)), true);
            });
        })
        describe('Pawn Moves 4', function() {
            it('Check black pawns are correct', function() {
                let b: Board = new Board();
                b.setColor(5, 7, COLOR.BLACK);
                b.setPiece(5, 7, PIECE.PAWN);
                b.blackPawns.push(7 * BOARD_FILES + 5);
                let m = b.generateMoves(COLOR.BLACK);
                assert.equal(m.length, 1);
                assert.equal(m[0].isEqual(new Move(7 * BOARD_FILES + 5, 6 * BOARD_FILES + 5)), true);
            });
        })
        describe('Pawn Moves 5', function() {
            it('Check moves are still correct with adjacent black pieces', function() {
                let b: Board = new Board();
                b.setColor(5, 7, COLOR.RED);
                b.setPiece(5, 7, PIECE.PAWN);
                b.redPawns.push(7 * BOARD_FILES + 5);
                b.setColor(4, 7, COLOR.RED);
                b.setColor(6, 7, COLOR.RED);
                b.setColor(5, 8, COLOR.BLACK);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 1);
                assert.equal(m[0].isEqual(new Move(7 * BOARD_FILES + 5, 8 * BOARD_FILES + 5)), true);
            });
        })
    });

    describe('General Moves Suite', function () {
        describe('General Moves 1', function () {
            it('Checks General move in center of palace', function() {
                let b: Board = new Board();
                b.setColor(5, 3, COLOR.RED);
                b.setPiece(5, 3, PIECE.GENERAL);
                b.redGenerals.push(3 * BOARD_FILES + 5);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
    });


});