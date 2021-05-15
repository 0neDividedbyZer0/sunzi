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

        describe('General Moves 2', function () {
            it('Checks Black General move in center of palace', function() {
                let b: Board = new Board();
                b.setColor(5, 10, COLOR.BLACK);
                b.setPiece(5, 10, PIECE.GENERAL);
                b.blackGenerals.push(10 * BOARD_FILES + 5);
                let m = b.generateMoves(COLOR.BLACK);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });

        describe('General Moves 3', function () {
            it('Checks red General move in corner of palace', function() {
                let b: Board = new Board();
                b.setColor(4, 2, COLOR.RED);
                b.setPiece(4, 2, PIECE.GENERAL);
                b.redGenerals.push(2 * BOARD_FILES + 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 2);
                console.log(m);
            });
        });

        describe('General Moves 4', function () {
            it('Checks red General move with adjacent pieces', function() {
                let b: Board = new Board();
                b.setColor(4, 2, COLOR.RED);
                b.setColor(5, 2, COLOR.RED);
                b.setColor(4, 3, COLOR.BLACK);
                b.setPiece(4, 2, PIECE.GENERAL);
                b.redGenerals.push(2 * BOARD_FILES + 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 1);
                console.log(m);
            });
        });
    });

    describe('Advisor Move Suite', function () {
        describe('Advisor Moves 1', function () {
            it('Checks red advisor moves in center of palace', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.ADVISOR, 5, 3);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('Advisor Moves 2', function () {
            it('Checks red advisor moves at corner of palace', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.ADVISOR, 4, 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 1);
                console.log(m);
            });
        });
        describe('Advisor Moves 3', function () {
            it('Checks black advisor moves at center of palace', function () {
                let b: Board = new Board();
                b.add(COLOR.BLACK, PIECE.ADVISOR, 5, 10);
                let m = b.generateMoves(COLOR.BLACK);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('Advisor Moves 4', function () {
            it('Checks red advisor moves when blocked', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.ADVISOR, 5, 3);
                b.setColor(4, 2, COLOR.RED);
                b.setColor(6, 2, COLOR.RED);
                b.setColor(6, 4, COLOR.BLACK);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 2);
                console.log(m);
            });
        });
    });

    describe('Elephant Move Suite', function () {
        describe('Elephant Moves 1', function () {
            it('Checks red elephant moves in center', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.ELEPHANT, 5, 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('Elephant Moves 2', function () {
            it('Checks red elephant moves do not cross river', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.ELEPHANT, 3, 6);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 2);
                console.log(m);
            });
        });
        describe('Elephant Moves 3', function () {
            it('Checks black elephant moves at center of board', function () {
                let b: Board = new Board();
                b.add(COLOR.BLACK, PIECE.ELEPHANT, 5, 9);
                let m = b.generateMoves(COLOR.BLACK);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('Elephant Moves 4', function () {
            it('Checks red elephant moves when blocked', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.ELEPHANT, 5, 4);
                b.setColor(4, 3, COLOR.RED);
                b.setColor(6, 3, COLOR.BLACK);
                b.setColor(7, 6, COLOR.BLACK);
                b.setColor(3, 6, COLOR.RED);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 1);
                console.log(m);
            });
        });
    });

    describe('Horse Move Suite', function () {
        describe('Horse Moves 1', function () {
            it('Checks red horse moves with no obstruction', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.HORSE, 5, 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 8);
                console.log(m);
            });
        });
        describe('Horse Moves 2', function () {
            it('Checks red horse moves at edge', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.HORSE, 1, 6);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 4);
                console.log(m);
            });
        });
        describe('Horse Moves 3', function () {
            it('Checks horse moves 1 away from edge', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.HORSE, 2, 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 6);
                console.log(m);
            });
        });
        describe('Horse Moves 4', function () {
            it('Checks red horse moves when blocked', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.HORSE, 5, 4);
                b.setColor(4, 4, COLOR.RED);
                b.setColor(6, 4, COLOR.BLACK);
                b.setColor(5, 3, COLOR.BLACK);
                b.setColor(4, 6, COLOR.BLACK);
                b.setColor(6, 6, COLOR.RED);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 1);
                console.log(m);
            });
        });
    });

    describe('Chariot Move Suite', function () {
        describe('Chariot Moves 1', function () {
            it('Checks red chariot moves with no obstruction', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.CHARIOT, 5, 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 17);
                console.log(m);
                
            });
        });
        describe('Chariot Moves 2', function () {
            it('Checks red chariot with obstructions', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.CHARIOT, 5, 4);
                b.setColor(5, 3, COLOR.RED);
                b.setColor(5, 5, COLOR.BLACK);
                b.setColor(6, 4, COLOR.BLACK);
                b.setColor(4, 4, COLOR.RED);
                let m = b.generateMoves(COLOR.RED);
                console.log(m);
                assert.equal(m.length, 2);
                
            });
        });
        
    });

    describe('Cannon Move Suite', function () {
        describe('Cannon Moves 1', function () {
            it('Checks red cannon moves with no obstruction', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.CANNON, 5, 4);
                let m = b.generateMoves(COLOR.RED);
                assert.equal(m.length, 17);
                console.log(m);
                
            });
        });
        describe('Cannon Moves 2', function () {
            it('Checks red cannon jump', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.CANNON, 5, 4);
                // No Jump
                b.setColor(5, 3, COLOR.RED);

                //Blocked jump
                b.setColor(5, 5, COLOR.BLACK);
                b.setColor(5, 6, COLOR.RED);

                //No double jump
                b.setColor(6, 4, COLOR.BLACK);
                b.setColor(7, 4, COLOR.RED);
                b.setColor(8, 4, COLOR.BLACK);

                //Regular jump
                b.setColor(4, 4, COLOR.RED);
                b.setColor(3, 4, COLOR.BLACK);

                let m = b.generateMoves(COLOR.RED);
                console.log(m);
                assert.equal(m.length, 1);
                
            });
        });

        describe('Cannon Moves 2', function () {
            it('Checks red cannon double jump special case', function () {
                let b: Board = new Board();
                b.add(COLOR.RED, PIECE.CANNON, 5, 4);
                // No Jump
                b.setColor(5, 3, COLOR.RED);

                //Blocked jump
                b.setColor(5, 5, COLOR.BLACK);
                b.setColor(5, 6, COLOR.RED);

                //No double jump
                b.setColor(6, 4, COLOR.BLACK);
                b.setColor(7, 4, COLOR.BLACK);
                b.setColor(8, 4, COLOR.BLACK);

                //Regular jump
                b.setColor(4, 4, COLOR.RED);
                b.setColor(3, 4, COLOR.BLACK);

                let m = b.generateMoves(COLOR.RED);
                console.log(m);
                assert.equal(m.length, 2);
                
            });
        });
        
    });

    describe('Legal Move Generation', function () {
        describe('Legal Move Test 1', function () {
            it('Tests a forcing move', function () {
                let b = new Board();
                b.add(COLOR.RED, PIECE.GENERAL, 5, 2);
                b.add(COLOR.RED, PIECE.ADVISOR, 4, 2);
                b.add(COLOR.RED, PIECE.ADVISOR, 6, 2);
                b.add(COLOR.BLACK, PIECE.CHARIOT, 5, 7);

                let m = b.legalMoves(COLOR.RED);
                console.log('Legal Moves:');
                console.log(m);
                assert.equal(m.length, 2);
                
            });
        });

        describe('Legal Move Test 2', function () {
            it('Tests flying generals', function () {
                let b = new Board();
                b.add(COLOR.RED, PIECE.GENERAL, 5, 2);
                
                b.add(COLOR.BLACK, PIECE.GENERAL, 4, 11);

                let m = b.legalMoves(COLOR.RED);
                console.log('Legal Moves:');
                console.log(m);
                assert.equal(m.length, 2);
            });
        });

        describe('Legal Move Test 3', function () {
            it('Tests pin', function () {
                let b = new Board();
                b.add(COLOR.RED, PIECE.GENERAL, 5, 2);
                b.add(COLOR.RED, PIECE.ELEPHANT, 5, 4);
                
                b.add(COLOR.BLACK, PIECE.GENERAL, 5, 11);

                let m = b.legalMoves(COLOR.RED);
                console.log('Legal Moves:');
                console.log(m);
                assert.equal(m.length, 3);
            });
        });

        describe('Legal Move Test 4', function () {
            it('Tests checkmate', function () {
                let b = new Board();
                b.add(COLOR.RED, PIECE.GENERAL, 4, 2);
                
                b.add(COLOR.BLACK, PIECE.GENERAL, 5, 11);
                b.add(COLOR.BLACK, PIECE.CHARIOT, 4, 10);

                assert.equal(b.isMated(COLOR.RED), true);
            });
        });

        describe('Legal Move Test 5', function () {
            it('Tests stalemate', function () {
                let b = new Board();
                b.add(COLOR.RED, PIECE.GENERAL, 5, 2);
                b.add(COLOR.RED, PIECE.ADVISOR, 5, 3);
                b.add(COLOR.RED, PIECE.ADVISOR, 6, 2);
                
                b.add(COLOR.BLACK, PIECE.GENERAL, 5, 11);
                b.add(COLOR.BLACK, PIECE.CHARIOT, 4, 10);

                assert.equal(b.isMated(COLOR.RED), true);
            });
        });

        describe('Legal Move Test 6', function () {
            it('Test full board start  move', function () {
                let b = Board.startBoard();
               
                let m = b.legalMoves(COLOR.RED);
                assert.equal(m.length, 44);
            });
        });

        describe('Legal Move Test 7', function () {
            it('Test Central Cannon glitch', function () {
                let b = new Board();
                b.add(COLOR.RED, PIECE.CANNON, 4, 6);
                b.add(COLOR.RED, PIECE.GENERAL, 5, 2);
                
                b.add(COLOR.BLACK, PIECE.GENERAL, 5, 11);
                b.add(COLOR.BLACK, PIECE.ADVISOR, 5, 10);
                let m = b.legalMoves(COLOR.RED);
                let testMove = new Move(b.redCannons[0], 6 * BOARD_FILES + 5);
                let found = false;
                for (let i = 0; i < m.length; i++) {
                    if (!found) {
                        found = testMove.isEqual(m[i]);
                    } else {
                        break;
                    }
                }
                console.log(m);
                assert.equal(found, true);
            });
        });
    });

});