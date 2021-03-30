"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../src/game/board");
var assert = require('assert');
describe('Board Tests', function () {
    describe('Pawn Moves Suite', function () {
        describe('Pawn Moves 1', function () {
            it('Check pawn generates correctly before river', function () {
                let b = new board_1.Board();
                b.setColor(5, 6, board_1.COLOR.RED);
                b.setPiece(5, 6, board_1.PIECE.PAWN);
                b.redPawns.push(6 * board_1.BOARD_FILES + 5);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 1);
                assert.equal(m[0].isEqual(new board_1.Move(6 * board_1.BOARD_FILES + 5, 7 * board_1.BOARD_FILES + 5)), true);
            });
        });
        describe('Pawn Moves 2', function () {
            it('Check pawn generates correctly after river', function () {
                let b = new board_1.Board();
                b.setColor(5, 7, board_1.COLOR.RED);
                b.setPiece(5, 7, board_1.PIECE.PAWN);
                b.redPawns.push(7 * board_1.BOARD_FILES + 5);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 3);
                assert.equal(m[0].isEqual(new board_1.Move(7 * board_1.BOARD_FILES + 5, 8 * board_1.BOARD_FILES + 5)), true);
                assert.equal(m[1].isEqual(new board_1.Move(7 * board_1.BOARD_FILES + 5, 7 * board_1.BOARD_FILES + 4)), true);
                assert.equal(m[2].isEqual(new board_1.Move(7 * board_1.BOARD_FILES + 5, 7 * board_1.BOARD_FILES + 6)), true);
            });
        });
        describe('Pawn Moves 3', function () {
            it('Check pawn generates at end of the board', function () {
                let b = new board_1.Board();
                b.setColor(5, 11, board_1.COLOR.RED);
                b.setPiece(5, 11, board_1.PIECE.PAWN);
                b.redPawns.push(11 * board_1.BOARD_FILES + 5);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 2);
                assert.equal(m[0].isEqual(new board_1.Move(11 * board_1.BOARD_FILES + 5, 11 * board_1.BOARD_FILES + 4)), true);
                assert.equal(m[1].isEqual(new board_1.Move(11 * board_1.BOARD_FILES + 5, 11 * board_1.BOARD_FILES + 6)), true);
            });
        });
        describe('Pawn Moves 4', function () {
            it('Check black pawns are correct', function () {
                let b = new board_1.Board();
                b.setColor(5, 7, board_1.COLOR.BLACK);
                b.setPiece(5, 7, board_1.PIECE.PAWN);
                b.blackPawns.push(7 * board_1.BOARD_FILES + 5);
                let m = b.generateMoves(board_1.COLOR.BLACK);
                assert.equal(m.length, 1);
                assert.equal(m[0].isEqual(new board_1.Move(7 * board_1.BOARD_FILES + 5, 6 * board_1.BOARD_FILES + 5)), true);
            });
        });
        describe('Pawn Moves 5', function () {
            it('Check moves are still correct with adjacent black pieces', function () {
                let b = new board_1.Board();
                b.setColor(5, 7, board_1.COLOR.RED);
                b.setPiece(5, 7, board_1.PIECE.PAWN);
                b.redPawns.push(7 * board_1.BOARD_FILES + 5);
                b.setColor(4, 7, board_1.COLOR.RED);
                b.setColor(6, 7, board_1.COLOR.RED);
                b.setColor(5, 8, board_1.COLOR.BLACK);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 1);
                assert.equal(m[0].isEqual(new board_1.Move(7 * board_1.BOARD_FILES + 5, 8 * board_1.BOARD_FILES + 5)), true);
            });
        });
    });
    describe('General Moves Suite', function () {
        describe('General Moves 1', function () {
            it('Checks General move in center of palace', function () {
                let b = new board_1.Board();
                b.setColor(5, 3, board_1.COLOR.RED);
                b.setPiece(5, 3, board_1.PIECE.GENERAL);
                b.redGenerals.push(3 * board_1.BOARD_FILES + 5);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('General Moves 2', function () {
            it('Checks Black General move in center of palace', function () {
                let b = new board_1.Board();
                b.setColor(5, 10, board_1.COLOR.BLACK);
                b.setPiece(5, 10, board_1.PIECE.GENERAL);
                b.blackGenerals.push(10 * board_1.BOARD_FILES + 5);
                let m = b.generateMoves(board_1.COLOR.BLACK);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('General Moves 3', function () {
            it('Checks red General move in corner of palace', function () {
                let b = new board_1.Board();
                b.setColor(4, 2, board_1.COLOR.RED);
                b.setPiece(4, 2, board_1.PIECE.GENERAL);
                b.redGenerals.push(2 * board_1.BOARD_FILES + 4);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 2);
                console.log(m);
            });
        });
        describe('General Moves 4', function () {
            it('Checks red General move with adjacent pieces', function () {
                let b = new board_1.Board();
                b.setColor(4, 2, board_1.COLOR.RED);
                b.setColor(5, 2, board_1.COLOR.RED);
                b.setColor(4, 3, board_1.COLOR.BLACK);
                b.setPiece(4, 2, board_1.PIECE.GENERAL);
                b.redGenerals.push(2 * board_1.BOARD_FILES + 4);
                let m = b.generateMoves(board_1.COLOR.RED);
                assert.equal(m.length, 1);
                console.log(m);
            });
        });
    });
});
